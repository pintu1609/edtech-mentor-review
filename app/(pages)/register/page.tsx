"use client";
import { useRegister } from "@/frontend/hooks/user";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import {
  initialRegister,
  registerValidationSchema,
} from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialRegister,
    validationSchema: toFormikValidationSchema(registerValidationSchema),
    onSubmit: async () => {
      try {
        const success = await mutateAsync(values);
        if (success) {
          toast.success(success.message ?? "Registration successful");
          resetForm();
          router.push("/");
        } else {
          toast.error("Invalid information");
        }
      } catch (error) {
        console.error(error);
        toast.error("Registration failed. Try again.");
      }
    },
  });

  const inputBase =
    "w-full px-4 py-2 rounded-lg bg-gray-50 border text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:ring-none";

  const errorBorder = "border-red-500";
  const normalBorder = "border-gray-300";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Join the platform and get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={`${inputBase} ${errors.name && touched.name ? errorBorder : normalBorder
                }`}
            />
            {errors.name && touched.name && (
              <p className="text-xs font-medium text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`${inputBase} ${errors.email && touched.email ? errorBorder : normalBorder
                }`}
            />
            {errors.email && touched.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="text"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`${inputBase} ${errors.password && touched.password
                  ? errorBorder
                  : normalBorder
                }`}
            />
            {errors.password && touched.password && (
              <p className="text-xs font-medium text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              className={`${inputBase} ${errors.role && touched.role ? errorBorder : normalBorder
                }`}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
            </select>
            {errors.role && touched.role && (
              <p className="text-xs font-medium text-red-500">
                {errors.role}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-60"
          >
            {isPending ? <BeatLoader size={8} color="#fff" /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
