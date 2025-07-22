"use client"
import { GetCompanies } from '@/app/api/getCompanies.api'
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import { Company } from '@/app/types/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {

    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetCompanies() as Company[]
            if (companies) setCompanies(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <LoadingOverlay />

    return (
        <div>
            {companies.map((el) => (
                <div className="" key={el._id}>

                    <Link href={`/admin/companies/${el._id}`}>
                        {el.role}
                    </Link>
                </div>
            ))}
        </div>
    )
}
