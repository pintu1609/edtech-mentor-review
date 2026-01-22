"use client";
import { useSubmitAssignment } from "@/frontend/hooks/student";
import { useFormik } from "formik";
import { initialAssignmentMentorReview, assignmentMentorReviewValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useReviewSubmission } from "@/frontend/hooks/mentor";
import { BeatLoader } from "react-spinners";

export default function ReviewSubmissionModal({
  open,
  submission,
  onClose,
  mentorRefetch,
  mentorStatRefetch

}: {
  open: boolean;
  submission: any;
  onClose: () => void;
  mentorRefetch: () => void;
  mentorStatRefetch: () => void
}) {


  if (!open || !submission) return null;

  const { mutateAsync, isPending } = useReviewSubmission();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialAssignmentMentorReview,
    validationSchema: toFormikValidationSchema(assignmentMentorReviewValidationSchema),
    onSubmit: async () => {

      try {
        const data = {
          submissionId: submission._id,
          feedback: values.feedback,
          score: values.score,
        }
        const success = await mutateAsync(data);
        if (success) {
          if (success.status === 201) {
            toast.success(success.message ?? "Submission successful !!");
            resetForm();
            onClose();
            mentorRefetch();
            mentorStatRefetch();

          } else if (success.status === 400) {
            toast.error("Assignment already submitted");
            resetForm();
            onClose();
          }
          else {
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

      <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl w-full max-w-lg shadow-xl">
        <div className="mb-4 border-b pb-3 space-y-1">
          <h2 className="font-semibold text-lg">
            Review Submission
          </h2>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Student:</span>{" "}
            {submission.studentId?.name}
          </p>

          <p className="text-sm">
            <span className="font-medium">Assignment:</span>{" "}
            {submission.assignmentId?.title}
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Description:</span>{" "}
            {submission.assignmentId?.description}
          </p>

          <p className="text-xs text-gray-500">
            Due date:{" "}
            {new Date(
              submission.assignmentId?.dueDate
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Student Submission</p>
          <div className="rounded-lg border bg-gray-50 p-3 text-sm whitespace-pre-wrap">
            {submission.content}
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <textarea
            className={`w-full border rounded-lg p-3 text-sm mb-2 focus:outline-none focus:ring-none ${touched.feedback && errors.feedback
                ? "border-red-500"
                : ""}`}

            placeholder="Write feedback..."
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            name="feedback"
          />

          <input
            type="number"
            className={`w-full border rounded-lg p-2 mb-4 text-sm focus:outline-none focus:ring-none ${touched.score && errors.score ? "border-red-500" : ""
              }`}
            placeholder="Score"
            value={values.score}
            onChange={handleChange}
            onBlur={handleBlur}
            name="score"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >{isPending ? (
              <BeatLoader size={8} color="white" />
            ) : (
              " Submit Review"
            )}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
