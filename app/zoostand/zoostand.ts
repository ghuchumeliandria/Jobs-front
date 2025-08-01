import { create } from 'zustand'
import { Company, Vacancy } from '../types/types'
import { persist } from 'zustand/middleware'

interface UploadState {
  file: File | null
  setFile: (file: File | null) => void
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  setFile: (file) => set({ file })
}))




interface CompanyState {
  company: Company | null
  setCompany: (company: Company) => void
  logout: () => void
}

export const useCompanyStore = create(
  persist<CompanyState>(
    (set) => ({
      company: null,
      setCompany: (company) => set({ company }),
      logout: () => set({ company: null }),
    }),
    {
      name: "company-storage", 
    }
  )
)
