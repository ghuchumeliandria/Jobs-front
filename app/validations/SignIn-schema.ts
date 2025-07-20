import { InferType, object, string } from "yup";


export const SignInSchema = object({
    email : string().email().required(),
    password : string().min(8).max(20).required()
})

export type SignInType = InferType<typeof SignInSchema>