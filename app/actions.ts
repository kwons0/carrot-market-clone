"use server"

import { z } from "zod";

function checkMail( email: string ){
    return email.includes('@zod.com')
}

function checkPassword( password: string ){
    return /\d/.test(password)
}

const formSchema = z.object({
    email: z
        .string().email().toLowerCase()
        .refine( checkMail, "Only @zod.com emails are allowed."),
    username: z
        .string().min(5, "Username should be at least 5 characters long."),
    password: z
        .string()
        .min(10, "Password should be at least 10 characters long.")
        .refine( checkPassword,"Password should contain at least one number (123456789)."),
})

export async function handleForm( prevState: any, formData: FormData){
    const data = {
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
    }
    const result = formSchema.safeParse(data)
    
    if( !result.success ){
        return { errors: result.error.flatten(), success: false };
    }else{
        return { errors: [], success: true };
    }

}