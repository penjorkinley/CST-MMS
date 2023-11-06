function LogoutModal({ isOpen, onCancel, onConfirm }) {
  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-xl">Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default LogoutModal;
