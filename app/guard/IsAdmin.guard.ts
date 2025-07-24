// "use client"

// import { useEffect, useState } from "react"
// import { CookieValueTypes, getCookie } from "cookies-next"
// import { useRouter } from "next/navigation"
// import {jwtDecode} from "jwt-decode"

// interface JwtPayload {
//   role: string | Promise<CookieValueTypes>
// }

// export default function IsAdminGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const token = getCookie("token") 

//     if (!token) {
//       router.push("/") 
//       return
//     }

//     try {
//       const decoded = jwtDecode<JwtPayload>(token)

//       if (decoded.role !== "admin") {
//         router.push("/") 
//         return
//       }

//       setIsLoading(false)
//     } catch (error) {
//       console.error("Invalid token", error)
//       router.push("/") 
//     }
//   }, [router])

//   if (isLoading) return null 

//   return <>{children}</>
// }