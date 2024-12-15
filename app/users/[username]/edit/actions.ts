"use server"


import db from "@/lib/db";
import getSession from '@/lib/session';
import {z} from 'zod';
import * as C from '@/lib/constants';
import fs from "fs/promises"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export async function getUser(){
    const session = await getSession();
    const user = await db.user.findUnique({
        where: { id: session.id },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            bio: true,
            avatar: true,
        }
    })
    return user;
}

const checkPassword = (
    { password, confirm_password }
    : { password: string, confirm_password: string }
) => password === confirm_password

const formSchema = z.object({
    avatar: z.string(),
    username: z.string({ invalid_type_error: "이름은 문자로 이루어져야 합니다.", required_error: "이름을 입력해주세요." })
        .toLowerCase().trim().min(C.USERNAME_MIN_LENGTH, C.USERNAME_MIN_LENGTH_ERROR)
    ,
    email: z.string().email().toLowerCase().regex(C.EMAIL_REGAX, "이메일 주소를 정확하게 입력해주세요."),
    password: z.string().min(C.PASSWORD_MIN_LENGTH, C.PASSWORD_MIN_LENGTH_ERROR)
        .refine(C.CHECK_PASSWORD,"비밀번호는 적어도 하나의 숫자를 포함해야 합니다."),
    confirm_password: z.string().min(C.PASSWORD_MIN_LENGTH, C.PASSWORD_MIN_LENGTH_ERROR),
    bio: z.string(),
}).superRefine( async({username}, ctx) => {
    const user = await db.user.findUnique({
        where: { username },
        select: { id: true, username: true, },
    });
    const currentUser = await getUser();
    if( user && user.username !== currentUser?.username){
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
        select: { id: true, email: true },
    });
    const currentUser = await getUser();
    if( user && user.email !== currentUser?.email){
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




export async function editInfo(prevState: unknown, formData: FormData){
    const data = {
        avatar: formData.get('avatar'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
        bio: formData.get('bio'),
    }

    const currentUser = await getUser();

    if( data.avatar instanceof File ) {
        const avatarData = await data.avatar.arrayBuffer();
        await fs.appendFile(`./public/img/profile/${data.avatar.name}`, Buffer.from(avatarData));

        if( data.avatar.name !== "undefined" ){    
            data.avatar = `/img/profile/${data.avatar.name}`
        }else{
            data.avatar = currentUser!.avatar
        }        
    }
    

    const result = await formSchema.spa(data);
    if( !result.success ){
        return result.error.flatten();
    } 
    else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12)
        const session = await getSession();
        if( session.id ){
            const user = await db.user.update({
                where: {id: session.id},
                data: {
                    avatar: result.data.avatar,
                    username: result.data.username,
                    email: result.data.email,
                    password: hashedPassword,
                    bio: result.data.bio
                },
                select: {
                    id:true,
                }
            })
            redirect('/')
        }
        
    }

}