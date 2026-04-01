import React from "react";
import ReactDOM from "react-dom"


const CreateModal = ({isOpen, onClose, children}) =>{
    if(!isOpen) return null

    const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9990,
  },
  modal: {
    background: "black",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "300px",
  },
};

    return ReactDOM.createPortal(

        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    )
}

export {CreateModal }