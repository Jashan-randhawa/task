import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import {
  Calendar,
  MapPin,
  Users,
  Music,
  Briefcase,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Building,
  DollarSign,
  Clock,
  Wrench,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Event Basics" },
  { id: 2, title: "Details" },
  { id: 3, title: "Specifics" },
  { id: 4, title: "Review & Post" },
];

const HIRING_TYPES = [
  {
    id: "Planner",
    label: "Event Planner",
    icon: Building,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "Performer",
    label: "Performer",
    icon: Music,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: "Crew",
    label: "Crew",
    icon: Briefcase,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function PostRequirementPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    event_date_range: "",
    location: "",
    venue: "",
    hiring_type: "",
    details: {},
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to post requirement");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Requirement posted successfully!");
      setCurrentStep(5); // Success state
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDetails = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (
        !formData.event_name ||
        !formData.event_type ||
        !formData.event_date_range ||
        !formData.location ||
        !formData.hiring_type
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                currentStep === step.id
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : currentStep > step.id
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {currentStep > step.id ? <CheckCircle size={20} /> : step.id}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${currentStep === step.id ? "text-indigo-600" : "text-gray-500"}`}
            >
              {step.title}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${currentStep > step.id + 1 ? "bg-green-500" : "bg-gray-200"}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name *
          </label>
          <input
            type="text"
            value={formData.event_name}
            onChange={(e) => updateFormData("event_name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Summer Music Festival"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type *
          </label>
          <select
            value={formData.event_type}
            onChange={(e) => updateFormData("event_type", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Type</option>
            <option value="Concert">Concert</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Private Party">Private Party</option>
            <option value="Exhibition">Exhibition</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date or Date Range *
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={formData.event_date_range}
              onChange={(e) =>
                updateFormData("event_date_range", e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. June 15-17, 2026"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City, State"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue (Optional)
          </label>
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => updateFormData("venue", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Central Park Amphitheater"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          I am hiring for: *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HIRING_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.hiring_type === type.id;
            return (
              <button
                key={type.id}
                onClick={() => updateFormData("hiring_type", type.id)}
                className={`flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? `border-indigo-600 ${type.bg}`
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`p-3 rounded-lg mr-4 ${isSelected ? type.color : "text-gray-400"}`}
                >
                  <Icon size={24} />
                </div>
                <div className="text-left">
                  <p
                    className={`font-semibold ${isSelected ? "text-indigo-900" : "text-gray-900"}`}
                  >
                    {type.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    switch (formData.hiring_type) {
      case "Planner":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.details.budget || ""}
                  onChange={(e) => updateDetails("budget", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. $5,000 - $10,000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Guest Count
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  value={formData.details.guest_count || ""}
                  onChange={(e) => updateDetails("guest_count", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 150"
                />
              </div>
            </div>
          </div>
        );
      case "Performer":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Performance Genre
              </label>
              <input
                type="text"
                value={formData.details.genre || ""}
                onChange={(e) => updateDetails("genre", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Jazz, Rock, Comedy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level Required
              </label>
              <select
                value={formData.details.experience || ""}
                onChange={(e) => updateDetails("experience", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Level</option>
                <option value="Emerging">Emerging / Amateur</option>
                <option value="Professional">Professional</option>
                <option value="Expert">Expert / Celebrity</option>
              </select>
            </div>
          </div>
        );
      case "Crew":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role Type
              </label>
              <select
                value={formData.details.role_type || ""}
                onChange={(e) => updateDetails("role_type", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="AV Technician">AV Technician</option>
                <option value="Stagehand">Stagehand</option>
                <option value="Catering Staff">Catering Staff</option>
                <option value="Security">Security</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Shift Duration
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.details.shift_duration || ""}
                  onChange={(e) =>
                    updateDetails("shift_duration", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 8 hours"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStep3 = () => {
    switch (formData.hiring_type) {
      case "Planner":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Level Needed
              </label>
              <select
                value={formData.details.service_level || ""}
                onChange={(e) => updateDetails("service_level", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Level</option>
                <option value="Full Planning">Full Planning</option>
                <option value="Partial Planning">Partial Planning</option>
                <option value="Day-of Coordination">Day-of Coordination</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Theme / Style
              </label>
              <textarea
                value={formData.details.theme || ""}
                onChange={(e) => updateDetails("theme", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the vibe of the event..."
                rows={3}
              />
            </div>
          </div>
        );
      case "Performer":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration of Performance
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.details.duration || ""}
                  onChange={(e) => updateDetails("duration", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 2 x 45 min sets"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Needs
              </label>
              <textarea
                value={formData.details.equipment || ""}
                onChange={(e) => updateDetails("equipment", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Sound system, lighting, stage size..."
                rows={3}
              />
            </div>
          </div>
        );
      case "Crew":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of People Needed
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  value={formData.details.crew_count || ""}
                  onChange={(e) => updateDetails("crew_count", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 5"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Skills / Requirements
              </label>
              <div className="relative">
                <Wrench
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={formData.details.special_skills || ""}
                  onChange={(e) =>
                    updateDetails("special_skills", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Forklift license, First aid"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="text-green-500 mr-2" size={20} />
          Review Your Requirement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p>
              <span className="text-gray-500 font-medium">Event:</span>{" "}
              {formData.event_name}
            </p>
            <p>
              <span className="text-gray-500 font-medium">Type:</span>{" "}
              {formData.event_type}
            </p>
            <p>
              <span className="text-gray-500 font-medium">Date:</span>{" "}
              {formData.event_date_range}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="text-gray-500 font-medium">Location:</span>{" "}
              {formData.location}
            </p>
            <p>
              <span className="text-gray-500 font-medium">Venue:</span>{" "}
              {formData.venue || "N/A"}
            </p>
            <p>
              <span className="text-gray-500 font-medium">Hiring:</span>{" "}
              {formData.hiring_type}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Specific Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {Object.entries(formData.details).map(([key, value]) => (
              <p key={key}>
                <span className="text-gray-500 font-medium capitalize">
                  {key.replace("_", " ")}:
                </span>{" "}
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        By clicking "Post Requirement", you agree to our terms of service.
      </p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-green-600" size={40} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Requirement Posted!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your requirement has been saved and is now visible to relevant
        professionals in your area.
      </p>
      <button
        onClick={() => {
          setFormData({
            event_name: "",
            event_type: "",
            event_date_range: "",
            location: "",
            venue: "",
            hiring_type: "",
            details: {},
          });
          setCurrentStep(1);
        }}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
      >
        Post Another
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          {currentStep < 5 ? (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Post a Requirement
                </h1>
                <p className="text-gray-500 mt-2">
                  Find the perfect talent for your next big event
                </p>
              </div>

              {renderStepIndicator()}

              <div className="mb-12">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${
                    currentStep === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                  >
                    Next Step
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                    className="flex items-center px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
                  >
                    {mutation.isPending ? "Posting..." : "Post Requirement"}
                    {!mutation.isPending && (
                      <ChevronRight className="ml-2" size={20} />
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            renderSuccess()
          )}
        </div>
      </div>
    </div>
  );
}
