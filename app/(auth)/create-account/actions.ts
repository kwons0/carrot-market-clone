"use server"

import {z} from 'zod';
import db from "@/lib/db";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import getSession from '@/lib/session';
import * as C from '@/lib/constants';

const checkPassword = (
    { password, confirm_password }
    : { password: string, confirm_password: string }
) => password === confirm_password

const formSchema = z.object({
    username: z
        .string({
            invalid_type_error: "이름은 문자로 이루어져야 합니다.",
            required_error: "이름을 입력해주세요."
        })
        .toLowerCase().trim()
        .min(C.USERNAME_MIN_LENGTH, C.USERNAME_MIN_LENGTH_ERROR)
    ,
    email: z
        .string().email().toLowerCase()
        .regex(C.EMAIL_REGAX, "이메일 주소를 정확하게 입력해주세요.")
    ,
    password: z
        .string()
        .min(C.PASSWORD_MIN_LENGTH, C.PASSWORD_MIN_LENGTH_ERROR)
        .refine(C.CHECK_PASSWORD,"비밀번호는 적어도 하나의 숫자를 포함해야 합니다.")
    ,
    confirm_password: z.string().min(C.PASSWORD_MIN_LENGTH, C.PASSWORD_MIN_LENGTH_ERROR)
    ,
}).superRefine( async({username}, ctx) => {
    const user = await db.user.findUnique({
        where: { username },
        select: { id: true },
    });
    if( user ){
        ctx.addIssue({
            code: "custom",
            message: "이미 사용중인 닉네임입니다.",
            path: ['username'],
            fatal: true,
        })
    };
    return z.NEVER;
}).superRefine( async({email}, ctx) => {
    const user = await db.user.findUnique({
        where: { email },
        select: { id: true },
    });
    if( user ){
        ctx.addIssue({
            code: "custom",
            message: "이미 사용중인 이메일입니다.",
            path: ['email'],
            fatal: true,
        })
    };
    return z.NEVER;
}).refine( checkPassword, {
    message: "비밀번호를 다시 확인해주세요.",
    path: ["confirm_password"]
})

export async function createAccount(prevState: unknown, formData: FormData){
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    }
    const result = await formSchema.spa(data);
    if( !result.success ){
        return result.error.flatten();
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12)
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })

        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect("/")
    }
    
}