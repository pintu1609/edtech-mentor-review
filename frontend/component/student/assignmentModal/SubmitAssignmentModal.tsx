"use client";
import { useSubmitAssignment } from "@/frontend/hooks/student";
import { useFormik } from "formik";
import { initalStudentSubmission, studentSubmissionValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import AssignmentComp from "./AssignmentComp";

export default function SubmitAssignmentModal({
  open,
  assignmentId,
  onClose,
  refetch,
  refetchSubmission,
  refetchStats
}: {
  open: boolean;
  assignmentId: string;
  onClose: () => void;
  refetch: () => void;
  refetchSubmission: () => void;
  refetchStats: () => void;
}) {

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
        if (success) {
          if (success.status === 201) {
            toast.success(success.message ?? "Submission successful !!");
            resetForm();
            onClose();
            refetch();
            refetchSubmission();
            refetchStats();

          } else if (success.status === 400) {
            toast.error("Assignment already submitted");
            resetForm();
            onClose();
          }
          else{
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
    <AssignmentComp open={open} onClose={onClose} handleSubmit={handleSubmit} handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} isPending={isPending}/>
  );
}
