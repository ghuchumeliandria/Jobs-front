"use client"
import { GetVacancies } from '@/app/api/getVacancies.api'
import { Vacancy } from '@/app/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Vacancies() {

    const [vacancies, setVacancies] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetVacancies()
            if (data) setVacancies(data)
            setLoading(false)

        }
        fetchData()
    }, [])
    console.log(vacancies)

    return (
        <div className='w-full flex flex-wrap  gap-4  '>
            {vacancies ? vacancies.map((el: Vacancy, index) => (
                <div className="w-full max-w-[295px] p-5 rounded-2xl border-[1px] border-[#e5e7eb]" key={index}>
                    <div className="">
                        {el.company.avatar ?
                            <Image src={el.company.avatar} alt='company-profile' width={30} height={30} />
                            : null}
                    </div>
                </div>
            )) : <h1>ვაკანსიები არ არის</h1>}
        </div>
    )
}
