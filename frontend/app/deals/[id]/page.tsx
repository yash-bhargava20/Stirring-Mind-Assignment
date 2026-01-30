"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Deal {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  isLocked: boolean;
  partner: string;
  discount: string;
  eligibility: string[];
  terms: string;
}

const mockDeal: Deal = {
  id: "1",
  title: "Premium Software License",
  description: "Get 50% off on premium software licenses",
  fullDescription:
    "This exclusive deal offers 50% off on our premium software licenses. Perfect for businesses looking to upgrade their tools and increase productivity. The license includes full access to all features, priority support, and regular updates.",
  category: "Software",
  isLocked: false,
  partner: "TechCorp",
  discount: "50%",
  eligibility: [
    "Must be a registered business",
    "Minimum purchase of $100",
    "Valid for new customers only",
  ],
  terms:
    "Offer valid until December 31, 2026. Cannot be combined with other offers. License is non-transferable.",
};

export default function DealDetailPage() {
  const params = useParams();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDeal(mockDeal);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleClaim = async () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      alert("Deal claimed successfully!");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Deal not found</h1>
          <Link href="/deals" className="text-teal-400 hover:text-teal-300">
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {deal.title}
                </h1>
                <p className="text-lg text-gray-300">{deal.description}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-teal-400">
                  {deal.discount}
                </span>
                <p className="text-sm text-gray-400">off</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Deal Details
                </h2>
                <p className="text-gray-300 mb-4">{deal.fullDescription}</p>

                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-teal-400">Category:</span>{" "}
                    <span className="text-gray-300">{deal.category}</span>
                  </p>
                  <p>
                    <span className="font-medium text-teal-400">Partner:</span>{" "}
                    <span className="text-gray-300">{deal.partner}</span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Eligibility Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {deal.eligibility.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Terms & Conditions
              </h2>
              <p className="text-gray-300">{deal.terms}</p>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Link href="/deals">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 text-gray-300 py-2 px-6 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Back to Deals
                </motion.button>
              </Link>

              {deal.isLocked ? (
                <div className="text-center">
                  <p className="text-red-400 mb-2">
                    This deal requires verification
                  </p>
                  <button className="bg-gray-600 text-gray-400 py-2 px-6 rounded-md cursor-not-allowed">
                    Locked
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {isClaiming ? "Claiming..." : "Claim Deal"}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
