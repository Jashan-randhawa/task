"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/utils/useUser";
import {
  CheckCircle,
  Clock,
  X,
  Mail,
  Phone,
  Link as LinkIcon,
  DollarSign,
  Calendar,
  MapPin,
  Building,
  Music,
  Briefcase,
  User,
  LogOut,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    color: "text-green-600",
    bg: "bg-green-50",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600",
    bg: "bg-red-50",
    icon: X,
  },
};

const HIRING_TYPE_CONFIG = {
  Planner: { icon: Building, color: "text-blue-600" },
  Performer: { icon: Music, color: "text-purple-600" },
  Crew: { icon: Briefcase, color: "text-orange-600" },
};

export default function DashboardPage() {
  const [filter, setFilter] = useState("all");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data: user, loading: userLoading } = useUser();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch("/api/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      return response.json();
    },
  });

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
                      href="/requirements"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Browse Requirements
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage all your applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-600 font-medium mb-1">Total Applications</p>
            <p className="text-3xl font-black text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl shadow-sm border border-yellow-100 p-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-yellow-700 font-medium">Pending</p>
              <Clock size={20} className="text-yellow-600" />
            </div>
            <p className="text-3xl font-black text-yellow-900">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-green-700 font-medium">Accepted</p>
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-3xl font-black text-green-900">
              {stats.accepted}
            </p>
          </div>
          <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-red-700 font-medium">Rejected</p>
              <X size={20} className="text-red-600" />
            </div>
            <p className="text-3xl font-black text-red-900">{stats.rejected}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "accepted", label: "Accepted" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                filter === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">No applications found</p>
            <a
              href="/requirements"
              className="mt-4 inline-block px-6 py-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Browse Requirements
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const statusConfig =
                STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusConfig.icon;
              const hiringConfig = HIRING_TYPE_CONFIG[app.hiring_type] || {};
              const HiringIcon = hiringConfig.icon || Building;

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Left: Event Details */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`p-3 bg-gray-50 rounded-xl ${hiringConfig.color}`}
                        >
                          <HiringIcon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {app.event_name}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {app.event_date_range}
                            </span>
                            <span className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {app.location}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                              {app.event_type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Applicant Details */}
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <p className="font-bold text-gray-900">
                          {app.applicant_name}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            {app.applicant_email}
                          </span>
                          {app.applicant_phone && (
                            <span className="flex items-center">
                              <Phone size={14} className="mr-2 text-gray-400" />
                              {app.applicant_phone}
                            </span>
                          )}
                        </div>
                        {app.rate && (
                          <p className="flex items-center text-sm text-gray-600">
                            <DollarSign
                              size={14}
                              className="mr-2 text-gray-400"
                            />
                            {app.rate}
                          </p>
                        )}
                        {app.portfolio_url && (
                          <a
                            href={app.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            <LinkIcon size={14} className="mr-2" />
                            View Portfolio
                          </a>
                        )}
                        {app.cover_message && (
                          <div className="pt-2 border-t border-gray-200 mt-2">
                            <p className="text-sm text-gray-700 italic">
                              "{app.cover_message}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Status */}
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color}`}
                      >
                        <StatusIcon size={16} />
                        <span className="font-bold text-sm">
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Applied{" "}
                        {new Date(app.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
