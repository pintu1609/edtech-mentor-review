"use client";
import { BeatLoader } from "react-spinners";

export default function AssignmentComp({
  open,
  onClose,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isPending
  
}: {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  touched: any;
  isPending: boolean
}) {

  if (!open) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="font-semibold mb-4">Submit Assignment</h2>
        <form onSubmit={handleSubmit}>
        <textarea
          className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-none ${
            touched.content && errors.content
              ? "border-red-500"
              : "border-gray-300"
          }`}
          rows={4}
          placeholder="Write your submission..."
          name="content"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.content}
        />

        <div className="flex justify-end mt-4 gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm
                       border border-gray-300
                       hover:bg-gray-100 cursor-pointer">Cancel</button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            {isPending ? (
              <BeatLoader size={8} color="white" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
