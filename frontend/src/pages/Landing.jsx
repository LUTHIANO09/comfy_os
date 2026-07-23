import { Link } from "react-router-dom";
import {
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiBarChart2,
  FiClipboard,
} from "react-icons/fi";

function Landing() {
  const features = [
    {
      title: "Inventory",
      icon: <FiBox className="text-3xl text-blue-600" />,
      desc: "Manage products and stock with ease.",
    },
    {
      title: "Sales",
      icon: <FiShoppingCart className="text-3xl text-blue-600" />,
      desc: "Fast and accurate point of sale.",
    },
    {
      title: "Expenses",
      icon: <FiDollarSign className="text-3xl text-blue-600" />,
      desc: "Track business expenses effortlessly.",
    },
    {
      title: "Customers",
      icon: <FiUsers className="text-3xl text-blue-600" />,
      desc: "Build and manage customer records.",
    },
    {
      title: "Reports",
      icon: <FiBarChart2 className="text-3xl text-blue-600" />,
      desc: "Business insights in real time.",
    },
    {
      title: "Audit Logs",
      icon: <FiClipboard className="text-3xl text-blue-600" />,
      desc: "Track every important activity.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <h1 className="text-2xl font-bold text-slate-900">
            COMFY OS
          </h1>

          <Link
            to="/login"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Login
          </Link>

        </div>
      </nav>

      {/* Hero */}

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

        <div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Business Management Software
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Run Your Business From One Dashboard
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            COMFY OS helps you manage inventory, sales,
            customers, expenses, payroll and reports from
            one powerful platform.
          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-100"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                <h3 className="text-lg font-bold text-slate-900">
                    COMFY OS Dashboard
                </h3>

                <p className="text-sm text-slate-500">
                    Business Overview
                </p>
                </div>

                <div className="rounded-xl bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Online
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                    Revenue
                </p>

                <h2 className="mt-2 text-3xl font-bold text-green-600">
                    ₦2.5M
                </h2>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                    Sales
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    548
                </h2>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                    Inventory
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    425
                </h2>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                    Customers
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    120
                </h2>
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-blue-600 p-5 text-white">

                <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm opacity-80">
                    Monthly Profit
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                    ₦845,000
                    </h2>
                </div>

                <div className="text-5xl">
                    📈
                </div>

                </div>

            </div>

            </div>

      </section>

      {/* Statistics */}

        <section className="border-y bg-white py-16">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">

            <div className="text-center">
            <h2 className="text-5xl font-bold text-slate-900">
                99.9%
            </h2>

            <p className="mt-3 text-slate-500">
                System Uptime
            </p>
            </div>

            <div className="text-center">
            <h2 className="text-5xl font-bold text-slate-900">
                24/7
            </h2>

            <p className="mt-3 text-slate-500">
                Business Access
            </p>
            </div>

            <div className="text-center">
            <h2 className="text-5xl font-bold text-slate-900">
                10+
            </h2>

            <p className="mt-3 text-slate-500">
                Business Modules
            </p>
            </div>

            <div className="text-center">
            <h2 className="text-5xl font-bold text-slate-900">
                Unlimited
            </h2>

            <p className="mt-3 text-slate-500">
                Business Growth
            </p>
            </div>

        </div>

        </section>

      {/* Features */}

      <section className="bg-slate-50 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-14 text-center">

            <h2 className="text-4xl font-bold">
              Everything Your Business Needs
            </h2>

            <p className="mt-4 text-slate-500">
              Built for modern retail businesses.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >

                {feature.icon}

                <h3 className="mt-5 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-500">
                  {feature.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Why Choose */}

        <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

            <div className="mb-14 text-center">

            <h2 className="text-4xl font-bold">
                Why Businesses Choose COMFY OS
            </h2>

            <p className="mt-4 text-slate-500">
                Designed to simplify daily business operations.
            </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-3">

            <div className="rounded-2xl border p-8">

                <h3 className="mb-4 text-2xl font-bold">
                Faster Operations
                </h3>

                <p className="leading-8 text-slate-600">
                Replace manual spreadsheets with an intelligent management system that saves time every day.
                </p>

            </div>

            <div className="rounded-2xl border p-8">

                <h3 className="mb-4 text-2xl font-bold">
                Better Decisions
                </h3>

                <p className="leading-8 text-slate-600">
                Live reports and dashboards help business owners understand their performance instantly.
                </p>

            </div>

            <div className="rounded-2xl border p-8">

                <h3 className="mb-4 text-2xl font-bold">
                Secure Records
                </h3>

                <p className="leading-8 text-slate-600">
                Every sale, expense and inventory movement is securely stored with complete audit history.
                </p>

            </div>

            </div>

        </div>

        </section>

      <footer className="bg-slate-900 py-16 text-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 lg:flex-row">

            <div>

            <h2 className="text-2xl font-bold">
                COMFY OS
            </h2>

            <p className="mt-3 text-slate-400">
                Retail Business Management System
            </p>

            </div>

            <div className="text-center lg:text-right">

            <p className="text-slate-400">
                Inventory • Sales • Expenses • Payroll • Reports
            </p>

            <p className="mt-2 text-sm text-slate-500">
                © 2026 COMFY OS. All rights reserved.
            </p>

            </div>

        </div>

        </footer>

    </div>
  );
}

export default Landing;