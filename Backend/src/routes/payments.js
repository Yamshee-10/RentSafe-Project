const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Payment = require("../models/Payment");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payments/create-order
// Create a Razorpay order for subscription or product rental
router.post("/create-order", async (req, res) => {
  try {
    const { user_id, amount, description, product_id, rental_days } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    // Verify user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Determine amount - use provided amount or default to subscription
    const orderAmount = amount || parseInt(process.env.SUBSCRIPTION_AMOUNT);
    const orderDescription = description || "Monthly Subscription";

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: orderAmount,
      currency: "INR",
      receipt: `rcpt_${user_id}_${Date.now()}`,
      notes: {
        user_id: user_id,
        email: user.email,
        phone: user.phone,
        product_id: product_id || null,
        rental_days: rental_days || null,
      },
    });

    console.log(
      `[PAYMENT] Order created: ${order.id} for user_id: ${user_id}, amount: ${orderAmount}, description: ${orderDescription}`
    );

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[PAYMENT ERROR] Create order failed:", error.message);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

// POST /api/payments/verify
// Verify Razorpay payment signature and update subscription/rental
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, product_id } = req.body;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      return res.status(400).json({ message: "Missing required payment details" });
    }

    console.log(`[PAYMENT] Verifying signature for order: ${razorpay_order_id}`);

    // Generate signature to verify
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify signature
    if (generated_signature !== razorpay_signature) {
      console.log(
        `[PAYMENT ERROR] Signature mismatch for order: ${razorpay_order_id}`
      );
      return res.status(400).json({ message: "Payment verification failed" });
    }

    console.log(`[PAYMENT] Signature verified successfully for order: ${razorpay_order_id}`);
    //  Fetch Razorpay order details
    // defining order
    const order = await razorpay.orders.fetch(razorpay_order_id);

    // Find or create payment record
    let payment = await Payment.findOne({
      where: { razorpay_order_id },
    });

    if (!payment) {
      // Payment is new
      const isRental = !!product_id;
      const description = isRental ? `Product Rental - Product #${product_id}` : "Monthly Subscription";
      // new code snippet 106-126
      // 🔥 Get rental details from frontend
      const { cart_items = [] } = req.body;

      // Calculate contract totals
      const totalMonths = cart_items.reduce(
        (sum, item) => sum + (item.total_months || 0),
        0
      );

      const remainingMonths = cart_items.reduce(
        (sum, item) => sum + (item.remaining_months || 0),
        0
      );

      const totalAmount = cart_items.reduce(
        (sum, item) =>
          sum + (item.total_months * item.price_per_month * 100),
        0
      );

      const remainingAmount = totalAmount - order.amount;
      //   payment = await Payment.create({
      //   user_id,
      //   razorpay_order_id,
      //   razorpay_payment_id,
      //   razorpay_signature,
      //   // amount: parseInt(razorpay_order_id), // Will be set from order details, new chnage of amount
      //   amount: parseInt(order.amount),
      //   status: "success",
      //   currency: "INR",
      //   description: description,
      // });
      
      // changing the payment.create from aforementioned to following

      payment = await Payment.create({
        user_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: order.amount,
        total_months: totalMonths,
        paid_months: 1,
        remaining_months: remainingMonths,
        total_amount: totalAmount,
        remaining_amount: remainingAmount,
        status: "success",
        currency: "INR",
        description: description,
      });
      console.log(
        `[PAYMENT] Payment record created for user_id: ${user_id}, payment_id: ${payment.id}`
      );

      // Only update subscription if this is a subscription payment (not rental)
      if (!product_id) {
        const subscriptionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        await User.update(
          {
            subscription_status: "active",
            subscription_expires_at: subscriptionExpiresAt,
            razorpay_customer_id: razorpay_payment_id,
          },
          {
            where: { user_id },
          }
        );

        console.log(
          `[PAYMENT] Subscription activated for user_id: ${user_id} until ${subscriptionExpiresAt.toISOString()}`
        );
      } else {
        console.log(
          `[PAYMENT] Product rental payment recorded for user_id: ${user_id}, product_id: ${product_id}`
        );
      }
    } else if (payment.status === "success") {
      // Payment already verified
      console.log(
        `[PAYMENT] Payment already verified for order: ${razorpay_order_id}`
      );
    }

    // Fetch updated user
    const updatedUser = await User.findByPk(user_id);

    // Parse address if it's a JSON string
    const userResponse = updatedUser.toJSON();
    if (typeof userResponse.address === "string") {
      try {
        userResponse.address = JSON.parse(userResponse.address);
      } catch (e) {}
    }

    res.json({
      message: "Payment verified successfully",
      user: userResponse,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        created_at: payment.createdAt,
      },
    });
  } catch (error) {
    console.error("[PAYMENT ERROR] Verification failed:", error.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

// GET /api/payments/status/:user_id
// Check subscription status of user
router.get("/status/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payments = await Payment.findAll({
      where: { user_id },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({
      subscription_status: user.subscription_status,
      subscription_expires_at: user.subscription_expires_at,
      recent_payments: payments,
    });
  } catch (error) {
    console.error("[PAYMENT ERROR] Status check failed:", error.message);
    res.status(500).json({ message: "Failed to check payment status" });
  }
});

module.exports = router;
