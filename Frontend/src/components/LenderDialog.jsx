// src/components/LenderDialog.jsx

// src/components/LenderDialog.jsx

// src/components/LenderDialog.jsx

import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import "./LenderDialog.css";

const LenderDialog = ({ open, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minRental, setMinRental] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open && step === 1) {
      startCamera();
    }
  }, [open, step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);
    setStep(2);

    // Stop camera after capturing
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // -----------------------
  // 🚀 SUBMIT PRODUCT
  // -----------------------
  const handleSubmit = async () => {
    try {
      // Convert Base64 image to a File
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "product.png", { type: "image/png" });

      // FormData to send to backend
      const formData = new FormData();
      formData.append("name", name);
      formData.append("priceRange", priceRange);
      formData.append("minRentalPeriod", minRental);
      formData.append("description", description);
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Product saved:", data);

      alert("Product submitted successfully!");

      // Reset dialog
      resetDialog();

    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Failed to submit product.");
    }
  };

  const resetDialog = () => {
    setStep(1);
    setImage(null);
    setName("");
    setPriceRange("");
    setMinRental("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={resetDialog}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "lender-dialog-paper",
      }}
    >
      {/* ----------------- */}
      {/* STEP 1 — CAMERA */}
      {/* ----------------- */}
      {step === 1 && (
        <>
          <DialogTitle className="lender-dialog-title">
            Take a Picture of Your Product
          </DialogTitle>

          <DialogContent>
            <div className="lender-camera-box">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%" }}
              />
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              fullWidth
              className="lender-secondary-btn"
              onClick={capturePhoto}
            >
              Capture
            </Button>

            <Button fullWidth className="lender-secondary-btn" onClick={resetDialog}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}

      {/* --------------------- */}
      {/* STEP 2 — PRODUCT FORM */}
      {/* --------------------- */}
      {step === 2 && (
        <>
          <DialogTitle className="lender-dialog-title">Product Details</DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {image && (
              <img
                src={image}
                alt="Captured"
                style={{ width: "100%", borderRadius: 12, marginBottom: 10 }}
              />
            )}

            <TextField
              label="Product Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="lender-input"
            />

            <TextField
              label="Price Range Per Month (₹)"
              fullWidth
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="lender-input"
            />

            <TextField
              label="Minimum Rental Period (in months)"
              fullWidth
              value={minRental}
              onChange={(e) => setMinRental(e.target.value)}
              className="lender-input"
            />

            <TextField
              label="Product Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="lender-input"
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              fullWidth
              className="lender-primary-btn"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Button
              fullWidth
              className="lender-secondary-btn"
              onClick={() => {
                setStep(1);
                startCamera();
              }}
            >
              Back
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default LenderDialog;















// import React, { useRef, useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from "@mui/material";
// import "./LenderDialog.css";

// const LenderDialog = ({ open, onClose }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [step, setStep] = useState(1);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (open && step === 1) {
//       startCamera();
//     }
//   }, [open, step]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0);

//     const imageData = canvas.toDataURL("image/png");
//     setImage(imageData);
//     setStep(2);

//     // Stop camera on capture
//     const stream = video.srcObject;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   const handleSubmit = () => {
//     alert("Product submitted!");
//     setStep(1);
//     setImage(null);
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={() => {
//         onClose();
//         setStep(1);
//         setImage(null);
//       }}
//       fullWidth
//       maxWidth="sm"
//       PaperProps={{
//         className: "lender-dialog-paper",
//       }}
//     >
//       {/* STEP 1 — CAMERA */}
//       {step === 1 && (
//         <>
//           <DialogTitle className="lender-dialog-title">
//             Take a Picture of Your Product
//           </DialogTitle>

//           <DialogContent>
//             <div className="lender-camera-box">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 style={{ width: "100%" }}
//               />
//             </div>

//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </DialogContent>

//           <DialogActions>
//             <Button
//               variant="outlined"
//               fullWidth
//               className="lender-secondary-btn"
//               onClick={capturePhoto}
//             >
//               Capture
//             </Button>

//             <Button
//               fullWidth
//               className="lender-secondary-btn"
//               onClick={() => {
//                 onClose();
//                 setStep(1);
//                 setImage(null);
//               }}
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </>
//       )}

//       {/* STEP 2 — FORM */}
//       {step === 2 && (
//         <>
//           <DialogTitle className="lender-dialog-title">
//             Product Details
//           </DialogTitle>

//           <DialogContent
//             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           >
//             {image && (
//               <img
//                 src={image}
//                 alt="Captured"
//                 style={{ width: "100%", borderRadius: 12, marginBottom: 10 }}
//               />
//             )}

//             <TextField
//               label="Product Name"
//               fullWidth
//               className="lender-input"
//             />

//             <TextField
//               label="Price Range Per Month (₹)"
//               fullWidth
//               className="lender-input"
//             />

//             <TextField
//               label="Minimum Rental Period (in months)"
//               fullWidth
//               className="lender-input"
//             />

//             <TextField
//               label="Product Description"
//               multiline
//               rows={4}
//               fullWidth
//               className="lender-input"
//             />
//           </DialogContent>

//           <DialogActions>
//             <Button
//               variant="contained"
//               fullWidth
//               className="lender-primary-btn"
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>

//             <Button
//               fullWidth
//               className="lender-secondary-btn"
//               onClick={() => {
//                 setStep(1);
//                 setImage(null);
//                 startCamera();
//               }}
//             >
//               Back
//             </Button>
//           </DialogActions>
//         </>
//       )}
//     </Dialog>
//   );
// };

// export default LenderDialog;









// import React, { useState, useRef, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// import "./LenderDialog.css";

// export default function LenderDialog({ open, onClose }) {
//   const [step, setStep] = useState(1); // 1 = camera, 2 = form
//   const [image, setImage] = useState(null);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Start camera stream when dialog opens
//   useEffect(() => {
//     let stream;
//     if (open && step === 1) {
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode: "environment" } })
//         .then((s) => {
//           stream = s;
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((err) => {
//           console.error("Camera error:", err);
//         });
//     }

//     return () => {
//       // Stop the camera when dialog closes or component unmounts
//       if (stream) {
//         stream.getTracks().forEach((t) => t.stop());
//       }
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       }
//     };
//   }, [open, step]);

//   const capturePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas) return;

//     // set canvas size to video dimensions
//     canvas.width = video.videoWidth || 640;
//     canvas.height = video.videoHeight || 480;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const dataURL = canvas.toDataURL("image/png");
//     setImage(dataURL);
//     setStep(2);

//     // stop camera after capture
//     if (video.srcObject) {
//       video.srcObject.getTracks().forEach((t) => t.stop());
//     }
//   };

//   const handleSubmit = () => {
//     // replace this with your API call later
//     alert("Your product has been submitted (demo)!");
//     onClose();
//     setStep(1);
//     setImage(null);
//   };

//   return (
//     <Dialog open={open} onClose={() => { onClose(); setStep(1); setImage(null); }} fullWidth maxWidth="sm">
//       {step === 1 && (
//         <>
//           <DialogTitle>Take a Picture of Your Product</DialogTitle>

//           <DialogContent>
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               style={{ width: "100%", borderRadius: 10, background: "#000" }}
//             />
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </DialogContent>

//           <DialogActions>
//             <Button variant="contained" onClick={capturePhoto}>
//               Capture
//             </Button>
//             <Button onClick={() => { onClose(); setStep(1); setImage(null); }}>Cancel</Button>
//           </DialogActions>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <DialogTitle>Product Details</DialogTitle>
//           <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {image && (
//               <img
//                 src={image}
//                 alt="Captured"
//                 style={{ width: "100%", borderRadius: 10 }}
//               />
//             )}

//             <TextField label="Product Name" fullWidth />
//             <TextField label="Price Range Per Month (₹)" fullWidth />
//             <TextField label="Minimum Rental Period (in months)" fullWidth />
//             <TextField
//               label="Product Description"
//               multiline
//               rows={4}
//               fullWidth
//             />
//           </DialogContent>

//           <DialogActions>
//             <Button variant="contained" onClick={handleSubmit}>
//               Submit
//             </Button>
//             <Button onClick={() => { setStep(1); setImage(null); }}>
//               Back
//             </Button>
//           </DialogActions>
//         </>
//       )}
//     </Dialog>
//   );
// }
