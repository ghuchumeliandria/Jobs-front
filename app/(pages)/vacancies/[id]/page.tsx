"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import Header from '@/app/components/__organisms/header/Header'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Vacancy } from '@/app/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Money from '../../../assets/images/money_5409901.png'
import Email from '../../../assets/images/email_3624711.png'
import Building from '../../../assets/images/office-building_4300059.png'
import { getCookie } from 'cookies-next'
import AddResumeModal from '@/app/components/__molecules/addResumeModal/AddResumeModal'

export default function page() {
    const token = getCookie("token")
    const [modal, setModal] = useState(false)
    const router = useRouter()
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

    const addResume = () => {
        if (token === undefined) {
            router.push('/sign-in')
            return
        }

        setModal(true)

    }

    if (loading) return <LoadingOverlay />
    return (
        <div className="bg-[#e5e7eb45] min-h-[110vh] -mt-5 pt-5 relative">
            <Header />
            <div className="w-full max-w-[1000px] mx-auto border border-[#ced0d3] mt-25 bg-white rounded-2xl p-6  flex flex-col  gap-6">
                {/* <div className="flex-shrink-0 self-center sm:self-start ">
                   
                </div> */}


                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center ">
                        <h1 className="text-xl font-bold text-gray-800">{vacancy?.name}</h1>
                        <div className="flex gap-3 items-center">
                            <button onClick={addResume} className='p-3  bg-[#a155b9] cursor-pointer rounded-full text-white font-semibold text-[13px]'>გაგზავნა</button>
                            <h1 className='text-[14px] text-gray-500'>{vacancy?.createdAt.split("T")[0]}</h1>
                        </div>
                    </div>

                    <div className="flex items-center">

                        <Link href={`/companies/${vacancy?.company._id}`}>
                            <h2 className='hover:underline hover:text-purple-500 text-[14px]'>{vacancy?.company.fullName}</h2>
                        </Link>
                        <span className="w-1 h-1 bg-gray-300 rounded-full inline-block mx-1"></span>

                        <h2 className='text-sm'>{vacancy?.location}</h2>

                    </div>

                    <div className="">

                        {vacancy?.sallery &&
                            <h1 className='text-[14px] flex items-center gap-2'><Image src={Money} alt='money' width={20} height={20} className='' />
                                {vacancy?.sallery}$  - {vacancy?.sallery + 200}$<span className='text-gray-500 text-[13px]'>/თვეში</span> </h1>
                        }

                        <p className='flex gap-2 text-[13px] mt-2'><Image src='https://myjobs.ge/images/people.svg' alt='people' width={20} height={20} />{vacancy?.company.fullName}</p>
                        <p className='flex gap-2 text-[13px] mt-2'><Image src={Email} alt='email' width={20} height={20} />{vacancy?.company.email}</p>



                    </div>

                </div>


                <div className="">
                    <h1 className='text-[18px] font-semibold'>ვაკანსიის აღწერა</h1>
                    <div className="pl-20 flex items-center gap-2">
                        <span className="w-1 h-1 bg-black rounded-full inline-block mx-1"></span>
                        <p className='text-gray-400 text-[14px] '>{vacancy?.description}</p>
                    </div>
                </div>
                {vacancy?.sallery &&
                    <div className="w-full">
                        <h1 className='text-[18px] font-semibold'>ხელფასის ანალიტიკა</h1>
                        <p className='mt-3 text-[14px] text-[#a155b9]'>ხელფასის სტატუსს Ხელოვნური ინტელექტი (AI) სხვადასხვა მონაცემების საფუძველზე ადგენს.
                        </p>
                        <div className="flex gap-1 mt-4">
                            <div className="flex-1 text-center">
                                <h2 className='mb-2 font-semibold'>დაბალი</h2>
                                <div className={`h-3   ${vacancy?.sallery > 0 && vacancy?.sallery < 1000 ? "bg-red-500" : "bg-gray-300"}`}></div>
                                <p className='font-semibold mt-2'>1000$</p>
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className='mb-2 font-semibold'>საშუალო</h2>
                                <div className={`h-3 flex-1  ${vacancy?.sallery > 1000 && vacancy?.sallery < 3000 ? "bg-yellow-500" : "bg-gray-300"}`}></div>
                                <p className='font-semibold mt-2'>3000$</p>
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className='mb-2 font-semibold' >მაღალი</h2>
                                <div className={`h-3 flex-1  ${vacancy?.sallery > 3000 ? "bg-green-500" : "bg-gray-300"}`}></div>
                                <p className='font-semibold mt-2'>+3000$</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="mt-5 w-full border flex gap-3 border-[#ced0d3] p-6 rounded-[10px]">
                    {vacancy?.company.avatar &&
                        <Image
                            src={vacancy?.company?.avatar}
                            alt={`${vacancy?.name} avatar`}
                            width={70}
                            height={70}
                            className="rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                    }
                    <div className="">
                        <Link href={`/companies/${vacancy?.company._id}`} className='hover:text-[#a155b9]' >
                            <h1 className='text-[18px] font-semibold flex gap-2 items-center'>{vacancy?.company.fullName} <Image src={Building} alt='building' width={20} height={20} /> </h1>
                        </Link>
                        <p className='text-[12px]'>{vacancy?.location}</p>
                    </div>
                </div>

            </div>
            {modal && <AddResumeModal vacancyId={vacancy?._id} setModal={setModal} />}
        </div>
    )
}
