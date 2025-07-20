import { InferType } from "yup";
import * as yup from 'yup'

export const AddVacancySchema = yup.object({
    name : yup.string().required("გთხოვთ შეიყვანოთ სახელი").matches(/^[ა-ჰa-zA-Z\s]+$/, "სახელი უნდა შეიცავდეს მხოლოდ ასოებს"),
    sallery : yup.number().required("გთხოვთ შეავსოთ ველი ").typeError("მხოლოდ რიცხვები უნდა იყოს").positive("მხოლოდ დადებითი რიცხვები უნდა იყოს"),
    location : yup.string().required("გთხოვთ შეავსოთ ველი"),
    description: yup.string().required("გთხოვთ შეავსოთ ველი")
})

export type AddVacancyType = InferType<typeof AddVacancySchema>