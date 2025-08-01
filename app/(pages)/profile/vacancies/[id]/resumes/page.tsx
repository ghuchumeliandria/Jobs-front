'use client'
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import Header from '@/app/components/__organisms/header/Header'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { Company, User, Vacancy } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '@/app/lib/axios-instance'
import { useParams } from 'next/navigation'
import Link from 'next/link'
export default function page() {
    const [user, setUser] = useState<Company | User | null>(null)
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    const [vacancy, setVacany] = useState<Vacancy | null>(null)
    const { id } = useParams()


    const getVacancy = async () => {
        try {
            const resp = await axiosInstance.get(`vacancies/${id}`)
            if (resp.status === 200) setVacany(resp.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getVacancy()
    }, [])



    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            getCurrentUserOrCompany({ token, setUser })
        }
    }, [])

    if (!vacancy) return <LoadingOverlay />

    return (
        <div>
            <Header />
            <div className="mt-28 w-full max-w-[1200px] mx-auto">
                {vacancy?.resumes.map((el, index) => {
                    console.log("resume id:", el._id) // აქ უნდა დაიბეჭდოს ჭეშმარიტი აიდი

                    return (
                        <div className="" key={index}>
                            <Link href={`/profile/resume/${el._id}`}>{el._id}</Link>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
