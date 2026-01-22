"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";


export default function Footer() {
  const pathname = usePathname();
  const cookies = useCookies();
  const router = useRouter();

  const isLoggedIn = Boolean(cookies.get("accessToken"));

  const showLogin = pathname === "/register";
  const showRegister = pathname === "/";

    const handleLogout = () => {
    cookies.remove("accessToken");
    router.push("/");
    router.refresh(); // ensures middleware re-check
  };

  return (
    <footer className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 border-t px-6 py-4">
      <div className="mx-auto max-w-7xl flex  items-center gap-3 justify-between">

        {/* Center / Left Section */}
        <div className="md:w-full text-sm text-gray-700 flex justify-center items-center gap-2 justify-center">
          <span className="font-semibold text-gray-900">Pintu Kumar</span>
          <span>•</span>
          <a
            href="https://github.com/pintu1609"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/pintu-kumar-46b147204/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            LinkedIn
          </a>
        </div>

        {/* Center / Right Section */}
        <div className="flex gap-3 justify-center">
          {!isLoggedIn && showLogin && (
            <Link
              href="/"
              className="rounded-md border border-purple-600 px-4 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </Link>
          )}

          {!isLoggedIn && showRegister && (
            <Link
              href="/register"
              className="rounded-md bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-700 transition"
            >
              Register
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="rounded-md border border-red-500 px-4 py-1.5 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </footer>
  );
}
