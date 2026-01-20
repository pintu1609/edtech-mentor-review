"use client";
import { useLogin } from "@/frontend/hooks/user";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { initialLogin, loginValidationSchema } from "@/frontend/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';




export default function Home() {
  const router = useRouter();
  const cookies = useCookies();


  const { mutateAsync, isPending } = useLogin();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialLogin,
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    onSubmit: async () => {

      try {
        const success = await mutateAsync(values);
        console.log("🚀 ~ Home ~ success:", success)
        if (success) {

          toast.success(success.message ?? "Login successful !!");

          if (success.status === 201) {
            resetForm();
            cookies.set('accessToken', success?.token)

            localStorage.setItem('name', success?.data?.name)
            if (success?.data?.role === "admin") {
              router.push("/dashboard/admin");
            } else if (success?.data?.role === "mentor") {
              router.push("/dashboard/mentor");
            } else if (success?.data?.role === "student") {
              router.push("/dashboard/student");
            }

          } else {
            toast.error("Invalid credentials");
          }
        }
        } catch (error) {
          console.error("Error during login:", error);
          toast.error("Login failed. Try again.");
        }
      },
    });
 return (
  <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome Back 👋
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            type="text"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-none
              ${
                errors.email && touched.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
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
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-none
              ${
                errors.password && touched.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
          />
          {errors.password && touched.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 flex h-11 items-center justify-center rounded-lg bg-purple-600 font-semibold text-white transition
            hover:bg-purple-700 active:scale-[0.98] disabled:opacity-60"
        >
          {isPending ? <BeatLoader size={8} color="#fff" /> : "Sign In"}
        </button>
      </form>
    </div>
  </div>
);

}
