"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Deal {
  id: string;
  title: string;
  description: string;
  category: string;
  isLocked: boolean;
  partner: string;
  discount: string;
}

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Premium Software License",
    description: "Get 50% off on premium software licenses",
    category: "Software",
    isLocked: false,
    partner: "TechCorp",
    discount: "50%",
  },
  {
    id: "2",
    title: "Cloud Storage Upgrade",
    description: "Double your storage for 6 months",
    category: "Cloud",
    isLocked: true,
    partner: "CloudProvider",
    discount: "100% storage",
  },
  {
    id: "3",
    title: "Business Consulting",
    description: "Free 1-hour consultation session",
    category: "Consulting",
    isLocked: false,
    partner: "BizExperts",
    discount: "Free",
  },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLocked, setShowLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDeals(mockDeals);
      setFilteredDeals(mockDeals);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = deals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter((deal) => deal.category === selectedCategory);
    }

    if (!showLocked) {
      filtered = filtered.filter((deal) => !deal.isLocked);
    }

    setFilteredDeals(filtered);
  }, [deals, searchTerm, selectedCategory, showLocked]);

  const categories = [
    "All",
    ...Array.from(new Set(deals.map((deal) => deal.category))),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
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
      className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Available Deals
          </h1>
          <p className="text-xl text-gray-300">
            Discover exclusive offers from our partners
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-teal-500 focus:border-teal-500"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-700 text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={showLocked}
                  onChange={(e) => setShowLocked(e.target.checked)}
                  className="mr-2 accent-teal-500"
                />
                Show locked deals
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${deal.isLocked ? "opacity-75" : ""}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {deal.title}
                  </h3>
                  {deal.isLocked && (
                    <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-700">
                      Locked
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{deal.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">{deal.category}</span>
                  <span className="text-lg font-bold text-teal-400">
                    {deal.discount}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Partner: {deal.partner}
                </p>
                {deal.isLocked ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      Verification required
                    </p>
                    <button className="w-full bg-gray-700 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed border border-gray-600">
                      Locked
                    </button>
                  </div>
                ) : (
                  <Link href={`/deals/${deal.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      View Deal
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDeals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No deals found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
