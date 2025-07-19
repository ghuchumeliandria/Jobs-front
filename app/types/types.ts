export type Company = {
    _id: string;
    fullName: string;
    email: string;
    description: string;
    role: "COMPANY" | "ADMIN" | "USER";
    avatar?: string; // optional თუ ყოველთვის არაა
    status: "pending" | "approved" | "rejected";
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

  export type Resume = {
    _id: string;
    fileId: string; 
    user: string;    
  }