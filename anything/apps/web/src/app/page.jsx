import React from "react";
import { ChevronRight, Calendar, Users, Music, Briefcase } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            E
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 italic">
            EventHiring
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
          <a
            href="/requirements"
            className="hover:text-indigo-600 transition-colors"
          >
            Find Talent
          </a>
          <a
            href="/dashboard"
            className="hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/post-requirement"
            className="hover:text-indigo-600 transition-colors"
          >
            Post Requirement
          </a>
        </nav>
        <a
          href="/account/signin"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
        >
          Sign In
        </a>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
            The world's best <span className="text-indigo-600">events</span>{" "}
            start here.
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
            Post your requirements and hire top-tier event planners, performers,
            and crew in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/post-requirement"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center group"
            >
              Post a Requirement
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="/requirements"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-gray-200 transition-all flex items-center justify-center"
            >
              Browse Talent
            </a>
          </div>
        </div>

        <div className="md:w-1/2 mt-20 md:mt-0 grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <div className="p-6 bg-white rounded-3xl shadow-xl shadow-indigo-50 border border-indigo-50 transform hover:-rotate-3 transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Calendar size={24} />
              </div>
              <p className="font-bold text-gray-900">Planners</p>
              <p className="text-sm text-gray-500 mt-1">
                Full service planning and logistics
              </p>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-xl shadow-purple-50 border border-purple-50 transform hover:rotate-2 transition-transform">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <Music size={24} />
              </div>
              <p className="font-bold text-gray-900">Performers</p>
              <p className="text-sm text-gray-500 mt-1">
                Artists, DJs, and live entertainment
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-3xl shadow-xl shadow-orange-50 border border-orange-50 transform hover:rotate-3 transition-transform">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                <Briefcase size={24} />
              </div>
              <p className="font-bold text-gray-900">Crew</p>
              <p className="text-sm text-gray-500 mt-1">
                Stagehands, AV technicians, and staff
              </p>
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-xl shadow-indigo-50 border border-indigo-50 transform hover:-rotate-2 transition-transform">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                <Users size={24} />
              </div>
              <p className="font-bold text-gray-900">Networking</p>
              <p className="text-sm text-gray-500 mt-1">
                Connect with local vendors
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
