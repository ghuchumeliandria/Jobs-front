import { InferType } from "yup";
import * as yup from 'yup'

export const CompanyApprovalSchema = yup.object({
    status : yup.string()
})

export type CompanyApprovalType = InferType<typeof CompanyApprovalSchema>