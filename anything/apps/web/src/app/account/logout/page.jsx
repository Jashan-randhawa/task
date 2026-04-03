"use client";

import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-200">
              E
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900 italic">
              EventHiring
            </span>
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Sign Out</h1>
          <p className="text-gray-600 mb-8">
            Are you sure you want to sign out?
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 mb-3"
          >
            Sign Out
          </button>

          <a
            href="/"
            className="block w-full py-3 text-gray-600 hover:text-gray-900 font-semibold"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
