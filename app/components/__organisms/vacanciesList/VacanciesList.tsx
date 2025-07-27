"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios-instance";
import LoadingOverlay from "@/app/components/__atoms/loading/LOadingOverlay";
import { Vacancy } from "@/app/types/types";
import Header from "../header/Header";
import { motion } from 'framer-motion'
import Image from "next/image";
import Email from '../../../assets/images/email_3624711.png'
import Money from '../../../assets/images/money_5409901.png'


export default function VacanciesList() {
    const [loading, setLoading] = useState(true);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    const searchParams = useSearchParams();

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {vacancies && vacancies.length > 0 ? vacancies.map((el: Vacancy, index) => (
                            <div className="w-full flex flex-col justify-between max-w-[295px] min-h-[253px] p-5 rounded-2xl border max-[639px]:max-w-full max-[639px]:rounded-xl border-[#e5e7eb] shadow-2xl shadow-[#A155B9]" key={index}>
                                <div className="">

                                    <div className="flex gap-3 items-center">
                                        {el.company.avatar ?
                                            <Image src={el.company.avatar} alt='company-profile' width={30} height={30} />
                                            : null}
                                        <div className="">
                                            <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.name}</h1>
                                            <p className='text-[13px] text-violet-400'>{el.location}</p>
                                        </div>

                                    </div>
                                    <p className='text-gray-500 text-[13px] leading-relaxed max-w-prose line-clamp-3'>{el.description}</p>

                                </div>

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
                                        {el.sallery}
                                    </p>
                                </div>
                            </div>
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
            </motion.div>
        </div>
    )
}
