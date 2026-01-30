"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ClaimedDeal {
  id: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  claimedDate: string;
  discount: string;
  partner: string;
}

const mockClaimedDeals: ClaimedDeal[] = [
  {
    id: "1",
    title: "Premium Software License",
    status: "approved",
    claimedDate: "2026-01-25",
    discount: "50%",
    partner: "TechCorp",
  },
  {
    id: "2",
    title: "Business Consulting",
    status: "pending",
    claimedDate: "2026-01-28",
    discount: "Free",
    partner: "BizExperts",
  },
];

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [claimedDeals, setClaimedDeals] = useState<ClaimedDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClaimedDeals(mockClaimedDeals);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profile
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Member Since
                  </label>
                  <p className="text-gray-900">January 2026</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>

          {/* Claimed Deals */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Claimed Deals
              </h2>

              {claimedDeals.length === 0 ? (
                <p className="text-gray-500">No claimed deals yet.</p>
              ) : (
                <div className="space-y-4">
                  {claimedDeals.map((deal, index) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {deal.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Partner: {deal.partner}
                          </p>
                          <p className="text-sm text-gray-600">
                            Claimed:{" "}
                            {new Date(deal.claimedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deal.status)}`}
                          >
                            {deal.status.charAt(0).toUpperCase() +
                              deal.status.slice(1)}
                          </span>
                          <p className="text-lg font-bold text-green-600 mt-1">
                            {deal.discount}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
