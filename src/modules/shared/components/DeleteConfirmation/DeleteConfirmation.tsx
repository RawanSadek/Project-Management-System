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
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 ">
      <div className="bg-white !p-8 rounded-lg shadow-xl max-w-md w-full">
        <img
          src={DeleteImg}
          alt="delete confirmation"
          className="h-96 mx-auto w-full object-contain"
        />
        <h2 className="text-center text-2xl font-semibold ">
          Are you sure you want to delete this item?
        </h2>
        <p className="text-center text-gray-600">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 !px-4 !py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className=" text-white !px-4 !py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
