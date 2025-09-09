import { FiAlertTriangle, FiX } from "react-icons/fi";
import DeleteImg from "./../../../../assets/Images/no-data.jpg";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
  <>
  <div className="fixed inset-0 z-50 flex items-center justify-center !p-4 !sm:p-6">
  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
    onClick={onClose}
    aria-hidden="true"
  />

  {/* Dialog */}
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-title"
    className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-7 transition-all"
  >
    {/* Close (X) */}
    <button
      type="button"
      onClick={onClose}
      className="absolute right-3.5 top-3.5 rounded-full !p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
      aria-label="Close"
    >
      <FiX />
    </button>

    {/* Icon */}
   

     <img
      src={DeleteImg}
      alt=""
      className="mx-auto !mt-4 h-90 w-full object-contain hidden sm:block"
    /> 

    {/* Title */}
    <h3 id="delete-title" className="!mt-4 text-center text-lg font-semibold text-slate-900">
      Are you sure you want to delete this item?
    </h3>

    {/* Description */}
    <p className="!mt-1.5 text-center text-sm text-slate-600">
      This action cannot be undone.
    </p>

    {/* Actions */}
    <div className="!mt-6 !mb-3 !mx-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        onClick={onClose}
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-slate-300 !px-5 !py-2.5 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        type="button"
        className="inline-flex items-center justify-center rounded-full bg-red-600 !px-5 !py-2.5 text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete
      </button>
    </div>
  </div>
</div>
  
  
  </>
  );
};

export default DeleteConfirmation;
