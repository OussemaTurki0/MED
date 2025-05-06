import React from "react";

function EmergencyModal({ setShowEmergencyModal, handleSOS }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full transform scale-100 animate-bounce-once">
        <div className="text-center mb-4">
          <i className="fas fa-exclamation-triangle text-4xl text-red-600"></i>
        </div>
        <h3 className="text-xl font-bold mb-4 text-red-600 text-center">
          Emergency Alert
        </h3>
        <p className="mb-4 text-center">
          Are you sure you want to trigger an SOS alert?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowEmergencyModal(false)}
            className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSOS}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
          >
            <i className="fas fa-exclamation-circle"></i>
            Confirm SOS
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmergencyModal;
