"use client";
import { useUpdateAssignment } from "@/frontend/hooks/student";
import { useFormik } from "formik";
import {  studentSubmissionValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import AssignmentComp from "./AssignmentComp";

type EditData = {
  id: string;
  assignmentId: string;
  content: string;
};

export default function EditAssignment({
  open,
  editData,
  onClose,
  refetchSubmission,
}: {
  open: boolean;
  editData:EditData;
  onClose: () => void;
  refetchSubmission: () => void;
}) {

  if (!open) return null;

const { mutateAsync, isPending } = useUpdateAssignment();
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      content: editData?.content,
    },
    validationSchema: toFormikValidationSchema(studentSubmissionValidationSchema),
    onSubmit: async () => {

      try {
        const data = {
          assignmentId: editData?.assignmentId,
          content: values.content
        }
        const success = await mutateAsync({
          id:editData?.id,
          data
        });
        if (success) {
          if (success.status === 201) {
            toast.success(success.message ?? "Submission successful !!");
            resetForm();
            onClose();
            refetchSubmission();

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
