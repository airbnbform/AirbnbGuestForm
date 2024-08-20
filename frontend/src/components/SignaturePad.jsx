import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "antd";
import "../styles/SignaturePad.css";

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    if (sigCanvas.current) {
      onSave(sigCanvas.current.toDataURL());
    }
  };
  // Überprüfung auf ein mobiles Gerät
  const isMobileDevice = window.innerWidth <= 768; // z.B. 768px als Schwelle für mobile Geräte

  // Berechnung der Canvas-Größe
  const canvasWidth = isMobileDevice
    ? window.innerWidth * 0.6
    : window.innerWidth * 0.3;
  const canvasHeight = isMobileDevice
    ? window.innerHeight * 0.22
    : window.innerHeight * 0.17;
  return (
    <div className="signature-pad-container">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          className: "signature-canvas",
          width: canvasWidth,
          height: canvasHeight,
        }}
      />
      <div className="signature-pad-buttons">
        <Button onClick={clear} style={{ marginRight: "10px" }}>
          Clear
        </Button>
        <Button onClick={save} type="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
