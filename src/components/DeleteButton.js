import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [confirmPopUp, setConfirmPopUp] = useState(false);

  if (confirmPopUp) {
    return (
      <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setConfirmPopUp(false)} type="button">
              Cancel
            </button>
            <button onClick={onDelete} type="button" className="primary">
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirmPopUp(true)} type="button">
      {label}
    </button>
  );
}
