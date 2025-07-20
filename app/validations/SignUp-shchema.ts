import { InferType, object, string } from "yup";
import * as yup from 'yup'

export const SignUpSchema = yup.object({
    fullName : yup.string().required("გთხოვთ შეიყვანოთ სახელი").matches(/^[ა-ჰa-zA-Z\s]+$/, "სახელი უნდა შეიცავდეს მხოლოდ ასოებს"),
    email : yup.string().email("გთხოვთ შეიყვანოთ სწორი იმეილი").required("იმეილი ცარიელია"),
    password : yup.string().min(8 , 'პაროლი უნდა იყოს 8 სიმბოლოზე მეტი').max(20 , 'პაროლი უნდა იყოს 20 ზე ნაკლები').required("გთხოვთ შეავსოთ ველი"),
    confirmPassword : yup.string().min(8 , 'პაროლი უნდა იყოს 8 სიმბოლოზე მეტი').max(20 , 'პაროლი უნდა იყოს 20 ზე ნაკლები').oneOf([yup.ref('password')], 'პაროლები არ ემთხვევა').required("გთხოვთ შეავსოთ ველი"),
    role: yup.string().required("გთხოვთ აირჩიეთ როლი"),
    description: yup.string().when('role', {
        is: 'COMPANY',
        then: (schema) => schema.required('კომპანიას სჭირდება აღწერა'),
        otherwise: (schema) => schema.optional(),
      })
})

export type SignUpType = InferType<typeof SignUpSchema>