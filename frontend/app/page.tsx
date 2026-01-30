"use client";

import { Zap, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "$2M+", label: "Total Value Available" },
  { value: "50+", label: "Partner Companies" },
  { value: "10K+", label: "Startups Served" },
];

const features = [
  {
    title: "Instant Access",
    description:
      "Claim deals in seconds. No lengthy application processes or waiting periods.",
    icon: Zap,
  },
  {
    title: "Verified Partners",
    description:
      "All partners are vetted to ensure quality and reliable service for your startup.",
    icon: ShieldCheck,
  },
  {
    title: "Community Driven",
    description:
      "Join thousands of founders sharing insights and building together.",
    icon: Users,
  },
  {
    title: "Scale Ready",
    description:
      "Access tools and resources designed to grow with your startup journey.",
    icon: TrendingUp,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <section className="flex flex-col items-center pt-32 pb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 px-4 py-2 rounded-full bg-gray-900 text-teal-400 font-semibold text-sm"
        >
          Over $2M in startup benefits available
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-4"
        >
          Premium SaaS deals for <br />
          <span className="text-teal-400">ambitious startups</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
        >
          Access exclusive discounts on cloud services, marketing tools,
          analytics platforms, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4"
        >
          <button className="bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold py-3 px-8 rounded-lg transition">
            Get Started →
          </button>
          <button className="border border-gray-400 px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            Sign In
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-12 mt-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-teal-400">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className=" py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Everything you need to{" "}
            <span className="text-teal-400">accelerate growth</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We've partnered with the best tools in the industry to help you
            build, launch, and scale faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#172136] rounded-xl p-8 text-center shadow-lg
                           hover:border-2 border-teal-500 
                           transition-all duration-300 cursor-pointer"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-teal-400 group-hover:scale-110 transition" />
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-24 flex flex-col md:flex-row gap-16 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to save on your{" "}
            <span className="text-teal-400">startup stack?</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of founders accessing exclusive deals worth over $1M.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "Access to exclusive startup deals",
              "Verified SaaS discounts",
              "Priority partner support",
              "Community of 10,000+ founders",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-2"
              >
                <span className="text-teal-400">●</span> {item}
              </motion.li>
            ))}
          </ul>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold py-3 px-8 rounded-lg transition"
          >
            Get Started Free →
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 bg-gray-900 rounded-2xl p-10 border border-[#232e47] shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <Zap className="h-8 w-8 text-teal-400" />
            <div>
              <div className="font-bold text-2xl">Premium</div>
              <div className="text-gray-400 text-sm">All deals unlocked</div>
            </div>
          </div>

          <p className="text-gray-300 mb-8">
            Everything included in free, plus exclusive partner perks.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full border border-teal-500 text-teal-500 font-bold py-3 rounded-lg hover:bg-teal-500 hover:text-[#0f172a] transition"
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
