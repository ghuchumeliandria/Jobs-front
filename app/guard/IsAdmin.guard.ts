"use client"
import { ReactNode, useEffect, useState } from "react"
import { useGetCurrentUserOrCompany } from "../lib/getCurrentUserOrCompany"
import { getCookie } from "cookies-next"
import { Company, User } from "../types/types"
import { useRouter } from "next/navigation"
import LoadingOverlay from "../components/__atoms/loading/LOadingOverlay"



export default function IsAdminGuard(){

    
    const router = useRouter()
    const [user, setUser] = useState<Company | User>()
    const [loading, setLoading] = useState(true)
    const token = getCookie("token")
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()

    useEffect(() => {
        const fetchUser = async () => {
            if (!token && user?.role !== 'ADMIN') {
                router.push('/')
                return null
            }
            
            await getCurrentUserOrCompany({ token, setUser })
            setLoading(false)
        }
        
        fetchUser()
        
    }, [])
    
    
    
    useEffect(() => {
        if (!loading && user && user.role !== "ADMIN") {
            router.push('/')
        }
    }, [user, loading])
    
    if (!loading && user && user.role !== "ADMIN") {
        return null
    }

    if(loading && user?.role !== 'ADMIN') return false
    
    
    return true
    
}