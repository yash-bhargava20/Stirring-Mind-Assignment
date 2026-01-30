"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NavBar() {
  const isLoggedIn = false;

  return (
    <motion.nav className="bg-gray-800 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-teal-500">
            Logo
          </Link>

          <div className="flex-1 flex justify-center gap-3">
            <Link
              href="/"
              className=" font-semibold text-sm text-gray-200 hover:text-teal-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/deals"
              className=" font-semibold text-sm text-gray-200 hover:text-teal-400 transition-colors"
            >
              Deals
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-semibold text-sm text-gray-200 hover:text-teal-400 transition-colors"
                >
                  Dashboard
                </Link>
                <button className="font-semibold text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="font-semibold text-sm text-gray-200 hover:text-teal-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="font-semibold text-sm bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
