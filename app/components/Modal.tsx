import React from "react";

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modal-custom row justify-content-center container-fluid " style={{background: 'rgba(0,0,0,0.25)', width: '100%'}}>
      <div className="card col-7">
        <div className="modal-content pa-5">
            <span onClick={onClose} style={{cursor: 'pointer', textAlign: 'right'}}>&times;</span>
            {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;