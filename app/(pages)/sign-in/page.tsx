'use client'
import { axiosInstance } from '@/app/lib/axios-instance'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { SignInSchema, SignInType } from '@/app/validations/SignIn-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
export default function SignIn() {
    const router = useRouter()
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(SignInSchema)
    })



    const onSubmit = async ({ email, password }: SignInType) => {
        try {
            const resp = await axiosInstance.post('/auth/sign-in', {
                email, password
            })

            if (resp.status === 201) {
                setCookie('token', resp.data.token, { maxAge: 60 * 120 })
                console.log('Token set')
                const role = await getCurrentUserOrCompany(resp.data)
                console.log('gacda')
                if (role === "ADMIN") {
                    console.log('Redirecting to /admin')
                    router.push('/admin')
                    return
                }

                router.push('/')
            }

        } catch (error) {
            console.log(error)
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
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#A155B9] text-white font-semibold rounded-lg hover:bg-[#8f44a4] transition duration-300"
                    >
                        შესვლა
                    </button>
                </form>
                <div className="flex gap-2 mt-4">
                    <p>Don't have an account?  </p>
                    <Link href="/sign-up" className='text-[#8f44a4] hover:underline'>Create account</Link>
                </div>

            </div >
        </div >
    )
}
