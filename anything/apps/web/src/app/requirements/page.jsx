"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/utils/useUser";
import {
  Search,
  MapPin,
  Calendar,
  Building,
  Music,
  Briefcase,
  ChevronRight,
  Filter,
  X,
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

export default function RequirementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterHiring, setFilterHiring] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data: user, loading: userLoading } = useUser();

  const { data: requirements = [], isLoading } = useQuery({
    queryKey: ["requirements"],
    queryFn: async () => {
      const response = await fetch("/api/requirements");
      if (!response.ok) throw new Error("Failed to fetch requirements");
      return response.json();
    },
  });

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.event_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || req.event_type === filterType;
    const matchesHiring = !filterHiring || req.hiring_type === filterHiring;
    return matchesSearch && matchesType && matchesHiring;
  });

  const clearFilters = () => {
    setFilterType("");
    setFilterHiring("");
    setSearchTerm("");
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
            {!userLoading && user ? (
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
            ) : (
              <>
                <a
                  href="/account/signin"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Browse Requirements
          </h1>
          <p className="text-gray-600">
            Find your next gig from {requirements.length} active opportunities
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by event name, location, or type..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-200"
            >
              <Filter size={18} className="mr-2" />
              Filters
              {(filterType || filterHiring) && (
                <span className="ml-2 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                  {[filterType, filterHiring].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="Concert">Concert</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Exhibition">Exhibition</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hiring For
                </label>
                <select
                  value={filterHiring}
                  onChange={(e) => setFilterHiring(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Categories</option>
                  <option value="Planner">Event Planner</option>
                  <option value="Performer">Performer</option>
                  <option value="Crew">Crew</option>
                </select>
              </div>
              {(filterType || filterHiring || searchTerm) && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Requirements Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading requirements...</p>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">
              No requirements found matching your criteria
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequirements.map((req) => {
              const config = HIRING_TYPE_CONFIG[req.hiring_type] || {};
              const Icon = config.icon || Building;
              return (
                <a
                  key={req.id}
                  href={`/requirements/${req.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 ${config.bg} rounded-xl ${config.color}`}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${config.bg} ${config.color}`}
                      >
                        {req.hiring_type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {req.event_name}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {req.event_date_range}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {req.location}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {req.event_type}
                      </span>
                      <ChevronRight
                        size={20}
                        className="text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
