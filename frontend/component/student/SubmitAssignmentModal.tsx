"use client";
import { useSubmitAssignment } from "@/frontend/hooks/student";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { initalStudentSubmission, studentSubmissionValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function SubmitAssignmentModal({
  open,
  assignmentId,
  onClose,
}: any) {

  if (!open) return null;

const { mutateAsync, isPending } = useSubmitAssignment();
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initalStudentSubmission,
    validationSchema: toFormikValidationSchema(studentSubmissionValidationSchema),
    onSubmit: async () => {

      try {
        const data = {
          assignmentId: assignmentId,
          content: values.content
        }
        const success = await mutateAsync(data);
        console.log("🚀 ~ Home ~ success:", success)
        if (success) {

          toast.success(success.message ?? "Submission successful !!");

          if (success.status === 201) {
            resetForm();
            onClose();

          } else {
            toast.error("something went wrong");
          }
        }
        } catch (error) {
          console.error("Error during login:", error);
          toast.error("assignment failed. Try again.");
        }
      },
    });


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
