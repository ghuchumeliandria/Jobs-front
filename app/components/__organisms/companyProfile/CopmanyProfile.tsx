"use client"

import { useCompanyStore } from "@/app/zoostand/zoostand"
import LoadingOverlay from "../../__atoms/loading/LOadingOverlay"

export default function CompanyProfile() {
    const company = useCompanyStore((state) => state.company)
    console.log(company)
    if (!company) return <LoadingOverlay />

    const statusColor = {
        approved: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        rejected: "bg-red-100 text-red-800",
    }

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10 border border-gray-200">
            <div className="flex items-center gap-6">
                {company.avatar ? (
                    <img
                        src={company.avatar}
                        alt="Company Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-300"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                        🏢
                    </div>
                )}

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {company.fullName}
                    </h2>
                    <p className="text-sm text-gray-500">{company.email}</p>
                    <span
                        className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${statusColor[company.status]
                            }`}
                    >
                        {company.status === "approved"
                            ? "დამტკიცებული"
                            : company.status === "pending"
                                ? "მოლოდინში"
                                : "უარყოფილი"}
                    </span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="text-gray-600 font-semibold mb-1">აღწერა</h4>
                    <p className="text-gray-700">{company.description}</p>
                </div>

                <div>
                    <h4 className="text-gray-600 font-semibold mb-1">როლი</h4>
                    <p className="text-gray-700">{company.role}</p>
                </div>

                <div>
                    <h4 className="text-gray-600 font-semibold mb-1">ვაკანსიები</h4>
                    <p className="text-gray-700">{company.vacansies.length} ვაკანსია</p>
                </div>

                <div>
                    <h4 className="text-gray-600 font-semibold mb-1">რეგისტრაცია</h4>
                    <p className="text-gray-700">
                        {new Date(company.createdAt).toLocaleDateString("ka-GE")}
                    </p>
                </div>
            </div>
        </div>
    )
}
