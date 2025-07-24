"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LoadingOverlay'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Company, Token, User } from '@/app/types/types'
import { CompanyApprovalSchema, CompanyApprovalType } from '@/app/validations/companyApproval-shema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CompanyApproval() {
    const [loading, setLoading] = useState(true)
    const [company, setCompany] = useState<Company | User>()
    const [status, setStatus] = useState<String | undefined>('')
    const [modal, setModal] = useState(false)
    const token = getCookie("token")
    const { id } = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(CompanyApprovalSchema)
    })


    console.log(id)
    const getCompany = async ({ token }: Token,) => {
        const resp = await axiosInstance.get(`admin/company/${id}`, {
            headers: {
                'Authorization': `Bearer ${token} `
            }
        }
        )
        if (resp.status === 200) setCompany(resp.data)

    }

    useEffect(() => {
        if (token)
            getCompany({ token })
        setLoading(false)
    }, [])


    const onSubmit = async ({ status }: CompanyApprovalType) => {
        const resp = await axiosInstance.patch(`/admin/company-approval/${id}`, {
            status
        }, {
            headers: {
                "authorization": ` Bearer ${token}`
            },
        })

        if (resp.status === 200) {
            setModal(true)
            setTimeout(() => {
                setModal(false)
                setStatus(status)
            }, 4000)
            await getCompany({ token })
        }

    }

    if (loading) return <LoadingOverlay />

    return (
        <div className="p-4">
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fade-in">
                        <h2
                            className={`text-lg font-bold mb-2 ${company?.status === "rejected" ? "text-red-500" : "text-green-500"
                                }`}
                        >
                            {company?.status === "rejected"
                                ? "თქვენ კომპანია არ დაამატეთ საიტზე"
                                : "თქვენ კომპანია წარმატებით დაამატეთ საიტზე"}
                        </h2>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            სტატუსი: {status}
                            <span
                                className={`${company?.status === "rejected" ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {status}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 max-w-xl mx-auto">
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{company?.fullName}</h1>
                <p className="text-sm text-gray-600 mb-1">📧 {company?.email}</p>
                <p className="text-sm text-gray-600 mb-1">🖼 {company?.avatar}</p>
                <p className="text-sm font-medium">
                    სტატუსი:{" "}
                    <span
                        className={`${company?.status === "rejected" ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {company?.status}
                    </span>
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto"
            >
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    შეცვალე სტატუსი
                </label>

                <select
                    defaultValue={company?.status}
                    {...register("status")}
                    id="status"
                    className="w-full max-w-sm px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                >
                    <option value="rejected">Reject</option>
                    <option value="approved">Approve</option>
                </select>

                <button
                    type="submit"
                    className="bg-[#A155B9] hover:bg-[#8e43a9] ml-2.5 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}
