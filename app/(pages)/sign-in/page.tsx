'use client'
import { axiosInstance } from '@/app/lib/axios-instance'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { SignInSchema, SignInType } from '@/app/validations/SignIn-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { setCookie } from 'cookies-next'
import { h1 } from 'framer-motion/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
export default function SignIn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(SignInSchema)
    })



    const onSubmit = async ({ email, password }: SignInType) => {
        setLoading(true)
        try {
            const resp = await axiosInstance.post('/auth/sign-in', {
                email, password
            })

            if (resp.status === 201) {
                setCookie('token', resp.data.token, { maxAge: 60 * 120 })
                const role = await getCurrentUserOrCompany(resp.data)
                if (role === "ADMIN") {
                    console.log('Redirecting to /admin')
                    router.push('/admin')
                    return
                }

                router.push('/')
            }

        } catch (error: any) {
            setError(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
                <h2 className="text-3xl font-bold text-center text-[#A155B9] mb-6 max-[450px] text-[22px]">
                    შესვლა
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ელ-ფოსტა</label>
                        <input
                            {...register('email')}
                            type="email"
                            name="email"
                            id='email'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="მაგ: example@gmail.com"

                        />

                        {errors.email && (
                            <p className='text-red-500 text-[14px]'>{errors.email.message}</p>
                        )}

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">პაროლი</label>
                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            id='password'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A155B9]"
                            placeholder="შეიყვანე პაროლი"

                        />
                        {errors.password && (
                            <p className='text-red-500 text-[14px]'>{errors.password.message}</p>
                        )}
                        {error !== "" && <h1 className='text-red-500 text-[14px] mt-1'>არასწორი მონაცემები</h1>}
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 bg-[#A155B9] text-white font-semibold rounded-lg hover:bg-[#8f44a4] transition duration-300"
                    >
                        შესვლა
                    </button>
                    {loading && <h1>...loading</h1>}
                </form>
                <div className="flex gap-2 mt-4">
                    <p>არ ხარ დარეგისტრირებული?  </p>
                    <Link href="/sign-up" className='text-[#8f44a4] hover:underline'>დარეგისტრირდი</Link>
                </div>

            </div >
        </div >
    )
}
