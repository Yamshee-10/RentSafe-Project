const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create", async (req, res) => {
  try {
    const { user_id, amount, total_months } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1️⃣ Create Razorpay Customer (if not exists)
    let customerId = user.razorpay_customer_id;

    if (!customerId) {
      const customer = await razorpay.customers.create({
        name: user.name,
        email: user.email,
        contact: user.phone,
      });

      customerId = customer.id;

      await user.update({
        razorpay_customer_id: customerId,
      });
    }

    // 2️⃣ Create Plan
    const plan = await razorpay.plans.create({
      period: "monthly",
      interval: 1,
      item: {
        name: "RentSafe Rental Plan",
        amount: amount,
        currency: "INR",
      },
    });

    // 3️⃣ Create Subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.id,
      customer_id: customerId,
      total_count: total_months,
      customer_notify: 1,
    });

    await user.update({
      razorpay_subscription_id: subscription.id,
      auto_debit_enabled: true,
      next_billing_date: new Date(subscription.current_end * 1000),
    });

    res.json({
      subscription_id: subscription.id,
      key_id: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Subscription creation failed" });
  }
});

module.exports = router;