import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    background: "rgb(187 247 208)",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

Modal.setAppElement("#root");

function CustomModal({ isOpen, onRequestClose, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{message}</h2>
      </div>
    </Modal>
  );
}

export default CustomModal;
