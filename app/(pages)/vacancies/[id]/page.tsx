"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import Header from '@/app/components/__organisms/header/Header'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Vacancy } from '@/app/types/types'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [vacancy, setVacancy] = useState<Vacancy | null>(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const getVacancy = async () => {
        try {
            const resp = await axiosInstance.get(`/vacancies/${id}`)
            if (resp.status = 200) {
                setVacancy(resp.data)
                setLoading(false)
                console.log(resp.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getVacancy()
    }, [])

    if (loading) return <LoadingOverlay />
    return (
        <div className="">
            <Header />
            <div className="w-full max-w-2xl mx-auto mt-25 bg-white rounded-2xl shadow-2xl shadow-purple-500 p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 self-center sm:self-start ">
                    {vacancy?.company.avatar &&
                        <Image
                            src={vacancy?.company?.avatar}
                            alt={`${vacancy?.name} avatar`}
                            width={100}
                            height={100}
                            className="rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                    }
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-gray-800">{vacancy?.name}</h2>

                    <p className="text-gray-600 text-sm leading-relaxed max-w-prose">
                        {vacancy?.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span>{vacancy?.company.email}</span>
                    </div>


                </div>
            </div>
        </div>
    )
}
