"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios-instance";
import LoadingOverlay from "@/app/components/__atoms/loading/LOadingOverlay";
import { Company, User, Vacancy } from "@/app/types/types";
import Header from "../header/Header";
import { motion } from 'framer-motion'
import Image from "next/image";
import Email from '../../../assets/images/email_3624711.png'
import Money from '../../../assets/images/money_5409901.png'
import { useGetCurrentUserOrCompany } from "@/app/lib/getCurrentUserOrCompany";
import { getCookie } from "cookies-next";
import Link from "next/link";


export default function VacanciesList() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Company | User | null>(null)
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    const searchParams = useSearchParams();

    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()

    const token = getCookie("token")

    useEffect(() => {
        const fetchUser = async () => {

            if (token) await getCurrentUserOrCompany({ token, setUser })
        }
        fetchUser()

    }, [])

    useEffect(() => {
        const getVacancies = async () => {
            try {
                const params: Record<string, string> = {};
                const name = searchParams.get("name");
                const category = searchParams.get("category");
                const location = searchParams.get("location");
                const minSallery = searchParams.get("minSallery");
                const maxSallery = searchParams.get("maxSallery");

                if (name) params.name = name;
                if (category) params.category = category;
                if (location) params.location = location;
                if (minSallery) params.minSallery = minSallery;
                if (maxSallery) params.maxSallery = maxSallery;

                const resp = await axiosInstance.get("vacancies", { params });

                if (resp.status === 200) {
                    setVacancies(resp.data);
                }
            } catch (error) {
                console.error("error in fetching vacancies");
            } finally {
                setLoading(false);
            }
        };

        getVacancies();
    }, [searchParams]);

    if (loading) return <LoadingOverlay />;

    if (!vacancies.length)
        return (
            <div className="text-center py-20 text-gray-600">
                <h2 className="text-2xl font-bold mb-2">Oops... არაფერი მოიძებნა 😕</h2>
                <p className="text-sm">შეამოწმე სხვა კატეგორია ან ადგილმდებარეობა</p>
            </div>
        );

    return (
        <div className="">
            <Header />
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='mt-23 max-w-[1440px] w-full mx-auto px-[100px] max-[1300px]:px-[50px] max-[850px]:px-5'
            >
                <h1 className='text-[32px] font-semibold pb-3 text-center'>ყველა ვაკანსია</h1>
                {loading ? <LoadingOverlay /> :
                    <div className="border rounded-[20px] border-[#e5e7eb]">
                        <div className="p-4 border-b border-[#e5e7eb]">
                            <h1 className="text-[#909090]">{vacancies.length} ვაკანსია</h1>
                        </div>
                        {vacancies && vacancies.length > 0 ? vacancies.map((el: Vacancy, index) => (
                            <Link href={`/vacancies/${el._id}`} key={index} >
                                <div className={`w-full flex gap-4   hover:bg-[#f3c1f320] hover:border-l-[4px] hover:border-l-[#8b4b8b]   mx-auto  p-5 border-b max-[639px]:max-w-full  border-[#e5e7eb] `} >

                                    <div className="">
                                        {el.company.avatar ?
                                            <Image src={el.company.avatar} alt='company-profile' width={40} height={30} />
                                            : null}

                                    </div>
                                    <div className="flex w-full justify-between ">

                                        <div className="">
                                            <h2 className="font-medium text-[16px]">{el.company.fullName}</h2>
                                            <h1 className="font-bold text-[20px]">{el.name}</h1>

                                            <h1 className="flex items-center mt-2 gap-1 text-[13px] text-[#909090]"><Image src={'https://myjobs.ge/images/secondaryPlace.svg'} alt="location" width={20} height={20} />{el.location}</h1>
                                        </div>

                                        <div className=" flex flex-col justify-between items-end">
                                            <h3 className="text-[13px] text-[#909090]">{el.createdAt.split('T')[0]}</h3>
                                            {el?.sallery &&
                                                <h1 className='text-[14px] flex items-center gap-2'><Image src={Money} alt='money' width={20} height={20} className='' />
                                                    {el?.sallery}$  - {el?.sallery + 200}$<span className='text-gray-500 text-[13px]'>/თვეში</span> </h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="">
                                    <div className="">
                                    <p className='text-[13px] text-violet-400'>{el.location}</p>
                                    </div>
                                    <p className='text-gray-500 text-[13px] leading-relaxed max-w-prose line-clamp-3'>{el.description}</p>
                                    
                                    <div className="mt-1 flex flex-col gap-2">
                                    <p className='flex gap-2 text-[13px] mt-2'>
                                    <Image src='https://myjobs.ge/images/people.svg' alt='people' width={20} height={20} />
                                    {el.company.fullName}
                                    </p>
                                    <p className='flex gap-2 text-[13px]'>
                                    <Image src={Email} alt='email' width={18} height={18} />
                                    {el.company.email}
                                    </p>
                                    <p className='text-[#222220] flex gap-2 text-[13px]'>
                                    <Image src={Money} alt='money-icon' width={20} height={20} />
                                    {el.sallery} $
                                    </p>
                                    </div>
                                    </div> */}
                            </Link>

                        )) : (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full text-center absolute py-20 text-gray-600"
                            >
                                <h2 className="text-2xl font-bold mb-2">Oops... არაფერი მოიძებნა 😕</h2>
                                <p className="text-sm">შეამოწმე სხვა კატეგორია ან ადგილმდებარეობა</p>
                            </motion.div>
                        )}
                    </div>
                }
            </motion.div >
        </div >
    )
}
