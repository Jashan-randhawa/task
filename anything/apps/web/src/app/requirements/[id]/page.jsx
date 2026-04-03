"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import useUser from "@/utils/useUser";
import {
  MapPin,
  Calendar,
  Building,
  Music,
  Briefcase,
  ArrowLeft,
  Send,
  Mail,
  Phone,
  Link as LinkIcon,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";

const HIRING_TYPE_CONFIG = {
  Planner: {
    icon: Building,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  Performer: {
    icon: Music,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  Crew: {
    icon: Briefcase,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
};

export default function RequirementDetailPage({ params }) {
  const requirementId = params.id;
  const queryClient = useQueryClient();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [applicationData, setApplicationData] = useState({
    applicant_name: "",
    applicant_email: "",
    applicant_phone: "",
    cover_message: "",
    portfolio_url: "",
    rate: "",
  });

  const { data: user, loading: userLoading } = useUser();

  const { data: requirement, isLoading } = useQuery({
    queryKey: ["requirement", requirementId],
    queryFn: async () => {
      const response = await fetch(`/api/requirements/${requirementId}`);
      if (!response.ok) throw new Error("Failed to fetch requirement");
      return response.json();
    },
  });

  const applicationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          requirement_id: parseInt(requirementId),
        }),
      });
      if (!response.ok) throw new Error("Failed to submit application");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setShowApplicationForm(false);
      setApplicationData({
        applicant_name: "",
        applicant_email: "",
        applicant_phone: "",
        cover_message: "",
        portfolio_url: "",
        rate: "",
      });
      queryClient.invalidateQueries(["applications"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to apply");
      window.location.href = "/account/signin";
      return;
    }

    if (!applicationData.applicant_name || !applicationData.applicant_email) {
      toast.error("Please fill in all required fields");
      return;
    }
    applicationMutation.mutate(applicationData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Loading requirement...</p>
        </div>
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Requirement not found</p>
          <a
            href="/requirements"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Back to Browse
          </a>
        </div>
      </div>
    );
  }

  const config = HIRING_TYPE_CONFIG[requirement.hiring_type] || {};
  const Icon = config.icon || Building;
  const details = requirement.details || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 italic">
              EventHiring
            </span>
          </a>
          <div className="flex items-center space-x-4">
            <a
              href="/requirements"
              className="flex items-center text-gray-600 hover:text-gray-900 font-semibold"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Browse
            </a>
            {!userLoading && user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold text-gray-700 transition-colors"
                >
                  <User size={18} />
                  <span>{user.email}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/post-requirement"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Post Requirement
                    </a>
                    <hr className="my-2 border-gray-100" />
                    <a
                      href="/account/logout"
                      className="block px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 ${config.bg} rounded-2xl ${config.color}`}>
                  <Icon size={32} />
                </div>
                <span
                  className={`px-4 py-2 text-sm font-bold rounded-full ${config.bg} ${config.color}`}
                >
                  {requirement.hiring_type}
                </span>
              </div>

              <h1 className="text-3xl font-black text-gray-900 mb-4">
                {requirement.event_name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                    <p className="font-semibold">
                      {requirement.event_date_range}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Location
                    </p>
                    <p className="font-semibold">{requirement.location}</p>
                  </div>
                </div>
                {requirement.venue && (
                  <div className="flex items-center md:col-span-2">
                    <Building size={20} className="mr-3 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Venue</p>
                      <p className="font-semibold">{requirement.venue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Event Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Event Type</span>
                  <span className="font-semibold text-gray-900">
                    {requirement.event_type}
                  </span>
                </div>
                {Object.entries(details).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600 font-medium capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900 text-right max-w-xs">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posted Date */}
            <div className="text-sm text-gray-500">
              Posted on{" "}
              {new Date(requirement.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Sidebar - Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              {!showApplicationForm ? (
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Interested?
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {user
                      ? "Submit your application to work on this event"
                      : "Sign in to apply for this event"}
                  </p>
                  {user ? (
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center"
                    >
                      Apply Now
                      <Send size={18} className="ml-2" />
                    </button>
                  ) : (
                    <a
                      href="/account/signin"
                      className="block w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-center"
                    >
                      Sign In to Apply
                    </a>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Submit Application
                  </h3>
                  <form
                    onSubmit={handleApplicationSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={applicationData.applicant_name}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            applicant_name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <input
                          type="email"
                          value={applicationData.applicant_email}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              applicant_email: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <input
                          type="tel"
                          value={applicationData.applicant_phone}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              applicant_phone: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portfolio / Website
                      </label>
                      <div className="relative">
                        <LinkIcon
                          size={16}
                          className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <input
                          type="url"
                          value={applicationData.portfolio_url}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              portfolio_url: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Rate
                      </label>
                      <div className="relative">
                        <DollarSign
                          size={16}
                          className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <input
                          type="text"
                          value={applicationData.rate}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              rate: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="$500/day or negotiable"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Message
                      </label>
                      <textarea
                        value={applicationData.cover_message}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            cover_message: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder="Why are you a good fit for this event?"
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={applicationMutation.isPending}
                      className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center disabled:opacity-50"
                    >
                      {applicationMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Application
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="w-full px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
