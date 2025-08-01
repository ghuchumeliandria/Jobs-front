import { CookieValueTypes, deleteCookie } from "cookies-next"
import { axiosInstance } from "./axios-instance"
import { Company, User } from "../types/types"

import { useCompanyStore } from "../zoostand/zoostand"

type PropsType = {
    token : CookieValueTypes | Promise<CookieValueTypes>,
    setUser : (data : Company | User) => void
}

export const useGetCurrentUserOrCompany = () =>{
    const getCurrentUserOrCompany = async ({token , setUser  } : PropsType) =>{
        try {
            const resp = await axiosInstance.get('/auth/current-user' , {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if(resp.status === 200){
                
                if(setUser){
                    setUser(resp.data)
                }
                if(resp.data.role === "COMPANY"){
                    const setCompany = useCompanyStore.getState().setCompany
                    setCompany(resp.data)
                }
               return resp.data.role

            }   
        } catch (error) {
            console.log("useri arasworia")
        }
    }
    return { getCurrentUserOrCompany}
    
}