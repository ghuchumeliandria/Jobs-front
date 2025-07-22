import { CookieValueTypes } from "cookies-next";

export type Company = {
    _id: string;
    fullName: string;
    email: string;
    description: string;
    role: "COMPANY" | "ADMIN" | "USER";
    avatar?: string; 
    status: "pending" | "approved" | "rejected";
    vacansies : Vacancy[]
    updatedAt: string;
    createdAt: string;
    __v: number;
  };

export type Vacancy = {
    _id: string;
    name: string;
    description: string;
    location: string;
    sallery: number;
    status: "pending" | "approved" | "rejected";
    company: Company;
    resumes: Resume[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  export type User = {
    _id: string;
    fullName: string;
    email: string;
    role: "COMPANY" | "ADMIN" | "USER";
    avatar?: string;
    status?: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
    applies : string[]
    __v: number;
  }

  export type Resume = {
    _id: string;
    fileId: string; 
    user: string;   
  }

  export type Token = {
      token: CookieValueTypes | Promise<CookieValueTypes>
  }