import { useEffect, useState } from "react";
import { getAuditLogs } from "../services/auditService";

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);

    const [module, setModule] = useState("");
    const [action, setAction] = useState("");
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        loadLogs();
    }, [module, action, search, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [module, action, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const loadLogs = async () => {
        setLoading(true);

        try {
            const data = await getAuditLogs({
                page: currentPage,
                module,
                action,
                search,
            });

            setSummary(data.summary);
            setLogs(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    const badgeColor = (action) => {
        switch (action) {
            case "CREATE":
                return "bg-green-100 text-green-700";

            case "UPDATE":
                return "bg-yellow-100 text-yellow-700";

            case "DELETE":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">
                    Audit Logs
                </h1>

                <p className="mt-1 text-slate-500">
                    Monitor every important activity in COMFY OS.
                </p>

            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-slate-500">
                        Total Logs
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {summary.total_logs}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Activities
                    </p>

                </div>

                <div
                    className="cursor-pointer rounded-xl bg-green-50 p-6 shadow hover:shadow-md"
                    onClick={() => setAction("CREATE")}
                >

                    <p className="text-green-700">
                        Creates
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {summary.creates || 0}
                    </h2>

                </div>

                <div
                    className="cursor-pointer rounded-xl bg-blue-50 p-6 shadow hover:shadow-md"
                    onClick={() => setAction("UPDATE")}
                >

                    <p className="text-blue-700">
                        Updates
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {summary.updates || 0}
                    </h2>

                </div>

                <div
                    className="cursor-pointer rounded-xl bg-red-50 p-6 shadow hover:shadow-md"
                    onClick={() => setAction("DELETE")}
                >

                    <p className="text-red-700">
                        Deletes
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {summary.deletes || 0}
                    </h2>

                </div>

            </div>

            {/* Filters */}

            <div className="flex flex-wrap items-center gap-4">

                <select
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className="rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="">
                        All Modules
                    </option>

                    <option value="Products">
                        Products
                    </option>

                    <option value="Inventory">
                        Inventory
                    </option>

                    <option value="Sales">
                        Sales
                    </option>

                    <option value="Expenses">
                        Expenses
                    </option>

                    <option value="Payroll">
                        Payroll
                    </option>

                </select>

                <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="">
                        All Actions
                    </option>

                    <option value="CREATE">
                        Create
                    </option>

                    <option value="UPDATE">
                        Update
                    </option>

                    <option value="DELETE">
                        Delete
                    </option>

                </select>

                <input
                        type="text"
                        placeholder="Search audit logs..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="rounded-lg border px-4 py-2 w-72"
                    />

                <button
                    onClick={() => {
                    setModule("");
                    setAction("");
                    setSearch("");
                    setSearchInput("");
                    setCurrentPage(1);
                }}
                    className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
                >
                    Reset Filters
                </button>

                

            </div>

            {/* Table */}

            <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="max-h-[650px] overflow-auto">

                    <table className="min-w-full">

                        <thead className="sticky top-0 bg-slate-100 z-10">

                            <tr>

                                <th className="px-5 py-4 text-left">
                                    S/N
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-left">
                                    User
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Module
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Action
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Description
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="py-16 text-center text-slate-500"
                                    >
                                        Loading audit logs...
                                    </td>

                                </tr>

                            ) : logs.length === 0 ? (

                                <tr>

                                   <td
                                        colSpan="5"
                                        className="py-20 text-center"
                                    >
                                        <div className="space-y-2">
                                            <p className="text-lg font-semibold text-slate-700">
                                                No Audit Logs Found
                                            </p>

                                            <p className="text-slate-500">
                                                Try changing your filters or search.
                                            </p>
                                        </div>
                                    </td>

                                </tr>

                            ) : (

                                logs.map((log, index) => (

                                    <tr
                                        key={log.id}
                                        className="border-t hover:bg-slate-50 transition"
                                    >

                                        {/* <td className="px-5 py-4">
                                            {new Date(log.created_at).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td> */}

                                        <td className="px-5 py-4 font-semibold text-slate-500">
                                            {(currentPage - 1) * 20 + index + 1}
                                        </td>

                                        <td className="px-5 py-4">
                                            {formatDate(log.created_at)}
                                        </td>

                                        <td className="px-5 py-4">
                                            {log.user_name}
                                        </td>

                                        <td className="px-5 py-4">
                                            {log.module}
                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(
                                                    log.action
                                                )}`}
                                            >
                                                {log.action}
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">
                                            {log.description}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Pagination */}

                <div className="mt-6 flex items-center justify-between">

                    <p className="text-sm text-slate-500">
                        Showing{" "}
                        {(currentPage - 1) * 20 + 1}
                        {" - "}
                        {Math.min(currentPage * 20, summary.total_logs || 0)}
                        {" of "}
                        {summary.total_logs || 0}
                        {" audit logs"}
                    </p>

                    <div className="flex gap-3">

                        <button
                            disabled={!previousPage}
                            onClick={() => setCurrentPage((page) => page - 1)}
                            className={`
                                rounded-lg
                                px-4
                                py-2
                                font-medium
                                transition
                                ${
                                    previousPage
                                        ? "bg-slate-700 text-white hover:bg-slate-800"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }
                            `}
                        >
                            Previous
                        </button>

                        <button
                            disabled={!nextPage}
                            onClick={() => setCurrentPage((page) => page + 1)}
                            className={`
                                rounded-lg
                                px-4
                                py-2
                                font-medium
                                transition
                                ${
                                    nextPage
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }
                            `}
                        >
                            Next
                        </button>

                    </div>

                </div>

        </div>
    );
}

export default AuditLogs;