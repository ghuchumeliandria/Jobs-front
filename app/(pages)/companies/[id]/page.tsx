"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import Header from '@/app/components/__organisms/header/Header'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Company } from '@/app/types/types'
import Email from '../../../assets/images/email_3624711.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function page() {

    const [company, setCompany] = useState<Company | null>(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const getCompany = async () => {
        try {
            const resp = await axiosInstance.get(`/company/${id}`)
            if (resp.status = 200) {
                setCompany(resp.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCompany()
    }, [])
    if (loading) return <LoadingOverlay />
    console.log(company)
    return (

        <div className="">
            <Header />
            <div className="w-full max-w-[1000px]  mx-auto mt-25 bg-white rounded-2xl shadow-xl shadow-pu p-6 flex flex-col  gap-6">

                <div className="w-full flex justify-between ">

                    <div className="">

                        <div className="flex gap-3 items-center">
                            {company?.avatar &&
                                <Image
                                    src={company?.avatar}
                                    alt={`${company?.fullName} avatar`}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover border border-gray-200 shadow-sm"
                                />
                            }
                            <h2 className="text-[18px] font-bold text-gray-800">{company?.fullName}</h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="">

                                <h1 className='text-[18px] font-semibold'>კომპანიის აღწერა</h1>
                                <div className="pl-20 flex items-center max-[550px]:pl-4 gap-2">
                                    <span className="w-1 h-1 bg-black rounded-full inline-block mx-1"></span>
                                    <p className='text-gray-400 text-[14px] max-w-[500px] '>{company?.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Image src={Email} alt='email icon' width={20} height={20} />
                                <span>{company?.email}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">ვაკანსიების რაოდენობა:</span>
                                <span>{company?.vacansies?.length || 0}</span>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">

                        {company?.createdAt ?
                            <h1>{company?.createdAt.split('T')[0]}</h1>
                            : <h1>00:00:00</h1>}
                    </div>
                </div>
                <div className="">
                    <h1 className='text-[26px] font-semibold mb-4 '>ვაკანსიები</h1>
                    <div className="flex flex-wrap gap-2">
                        {company?.vacansies.map((el, index) => (
                            <Link key={index} href={`/vacancies/${el._id}`}>
                                <div className=" p-3 shadow-lg bg-[#7f348f] border border-white rounded-[10px] cursor-pointer" >

                                    <h1 className='text-white font-semibold' >{el.name}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}
