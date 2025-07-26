"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
import IsLoggedIn from '@/app/guard/IsLogedIn.guard'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Token, User, Vacancy } from '@/app/types/types'
import { ApprovalSchema, ApprovalType } from '@/app/validations/Approval-shema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CompanyApproval() {
    const [loading, setLoading] = useState(true)
    const [vacancy, setVacancy] = useState<Vacancy>()
    const [status, setStatus] = useState<String | undefined>('')
    const [modal, setModal] = useState(false)
    const token = getCookie("token")
    const { id } = useParams()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(ApprovalSchema)
    })


    console.log(id)
    const getVacancy = async ({ token }: Token,) => {
        const resp = await axiosInstance.get(`admin/vacancy/${id}`, {
            headers: {
                'Authorization': `Bearer ${token} `
            }
        }
        )
        if (resp.status === 200) setVacancy(resp.data)

    }

    useEffect(() => {
        if (token)
            getVacancy({ token })
        setLoading(false)
    }, [])


    const onSubmit = async ({ status }: ApprovalType) => {
        const resp = await axiosInstance.patch(`/admin/vacancy-approval/${id}`, {
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
                router.push('/admin/vacancies')
            }, 3000)
            await getVacancy({ token })
        }

    }

    if (loading) return <LoadingOverlay />

    return (
        <IsLoggedIn >


            <AdminHeader />
            <div className="p-4 mt-20">


                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fade-in">
                            <h2
                                className={`text-lg font-bold mb-2 ${vacancy?.status === "rejected" ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {vacancy?.status === "rejected"
                                    ? "ვაკანსია წარმატებით დარეჯექთდა"
                                    : "ვაკანსია წარმატებით დაემატა კომპანიას"}
                            </h2>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                სტატუსი: {vacancy?.status}
                                <span
                                    className={`${vacancy?.status === "rejected" ? "text-red-500" : "text-green-500"
                                        }`}
                                >
                                    {status}
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 max-w-xl mx-auto">
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">{vacancy?.name}</h1>
                    <p className="text-sm text-gray-600 mb-1">📧 {vacancy?.company?.email}</p>
                    <p className="text-sm text-gray-600 mb-1">🖼 {vacancy?.company.avatar}</p>
                    <p className="text-sm font-medium">
                        სტატუსი:
                        <span className={`${vacancy?.status === "rejected" ? "text-red-500" : "text-green-500"}`}
                        >
                            {vacancy?.status}
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
                        defaultValue={vacancy?.status}
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
        </IsLoggedIn>
        // </IsAdminGuard>

    )
}
