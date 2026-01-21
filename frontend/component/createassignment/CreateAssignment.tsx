"use client";
import { useCreateAssignment } from "@/frontend/hooks/admin";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { initialAssignment, assignmentValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useGetAllMentor } from "@/frontend/hooks/user";
export default function CreateAssignmentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { mutateAsync, isPending } = useCreateAssignment();
  const {data}=useGetAllMentor();
  console.log("🚀 ~ CreateAssignmentModal ~ data:", data)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialAssignment,
    validationSchema: toFormikValidationSchema(assignmentValidationSchema),
    onSubmit: async () => {

      try {
        const success = await mutateAsync(values);
        console.log("🚀 ~ Home ~ success:", success)
        if (success) {

          toast.success(success.message ?? "assignment successful !!");

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

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 max-w-5xl rounded-2xl 
                      bg-white/80 backdrop-blur-xl
                      shadow-2xl border border-white/40 p-6">

        <h2 className="text-lg font-semibold mb-4">
          Create New Assignment
        </h2>

        {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Assignment Title
            </label>
            <input
              className={`mt-1 w-full rounded-lg border border-gray-300
                         bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-none ${errors.title && touched.title ? "border-red-500" : ""}`}
              placeholder="e.g. React Basics"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}

            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className={`mt-1 w-full rounded-lg border border-gray-300
                         bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-none ${errors.description && touched.description ? "border-red-500" : ""}`}
              rows={3}
              placeholder="Short description about the assignment"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          {/* Mentor */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Assign Mentor
            </label>
            <select
              className={`mt-1 w-full rounded-lg border border-gray-300
                         bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-none ${errors.mentor && touched.mentor ? "border-red-500" : ""}`}
              name="mentor"
              value={values.mentor}
              onChange={handleChange}
              onBlur={handleBlur}
             
            >
              <option value="">Select mentor</option>
              {data?.data?.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}

            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              className={`mt-1 w-full rounded-lg border border-gray-300
                         bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-none ${errors.dueDate && touched.dueDate ? "border-red-500" : ""}`}
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              onBlur={handleBlur}
            
            />
          </div>
        {/* </div> */}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm
                       border border-gray-300
                       hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-500 px-4 py-2 
                       text-sm font-semibold text-white
                       hover:bg-indigo-700 shadow z-50 transition cursor-pointer"
          >
              {isPending ? <BeatLoader size={8} color="#fff" /> : "Create Assignment"}
          </button>
        </div>
      </form>
      </div>
  );
}
