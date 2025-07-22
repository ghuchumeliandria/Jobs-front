import { CookieValueTypes, deleteCookie } from "cookies-next"
import { axiosInstance } from "./axios-instance"
import { useRouter } from "next/navigation"
import { Company, User } from "../types/types"

type PropsType = {
    token : CookieValueTypes | Promise<CookieValueTypes>,
    setUser : (data : Company | User) => void
}

export const useGetCurrentUserOrCompany = () =>{

    const router = useRouter()
    const getCurrentUserOrCompany = async ({token , setUser } : PropsType) =>{
        
        try {
            const resp = await axiosInstance.get('/auth/current-user' , {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if(resp.status === 200){
                setUser(resp.data)
            }   
        } catch (error) {
            deleteCookie("token")
            
        }
    }
    return { getCurrentUserOrCompany}
    
}