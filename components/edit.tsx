"use client"

import { editInfo } from "@/app/users/[username]/edit/actions";
import Button from "@/components/button";
import EditInput from "@/components/edit-input";
import { ADD_PHOTO_ICON, PROFILE_ICON } from "@/components/svg";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";

interface IEditProps {
    avatar: string | null | undefined;
    username: string;
    email: string;
    bio: string | null | undefined;
}

export default function EditPage(
    { avatar, username, email, bio }: IEditProps
){

    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if( !files ) return;
        const file = files[0];
        const url = URL.createObjectURL(file)
        setPreview(url)
    }
    const [state, trigger] = useFormState(editInfo, null)

    return(
        <>
            <form action={trigger}>
                <div className="flex justify-center relative">
                    {
                        preview !== ""
                        ? <img src={preview} alt="preview" className="w-[100px] h-[100px] object-cover rounded-full"/> 
                        : (
                            avatar
                            ? <Image src={avatar} width={100} height={100} alt={username}
                                className="rounded-full"
                                />
                            : <PROFILE_ICON classname="w-[100px]"/>
                        )
                    }
                    <label
                        htmlFor="avatar"
                        className="py-1 px-2 bg-[--main2] rounded-full absolute left-[55%] bottom-0" 
                    >
                        <ADD_PHOTO_ICON classname="w-5"/>
                    </label>
                    <input onChange={onImageChange} type="file" id="avatar" name="avatar" accept="image/*" className="hidden"/>
                </div>
                <ul>
                    <li>
                        <span className="block text-sm text-[--brown3] pb-2 mt-4">이름</span>
                        <EditInput name='username' type="text" required defaultValue={username} errors={state?.fieldErrors.username}/>
                    </li>
                    <li>
                        <span className="block text-sm text-[--brown3] pb-2 mt-4">이메일 주소</span>
                        <EditInput name='email' type="email" required defaultValue={email} errors={state?.fieldErrors.email}/>
                    </li>
                    <li>
                        <span className="block text-sm text-[--brown3] pb-2 mt-4">비밀번호</span>
                        <EditInput name='password' type="password" required errors={state?.fieldErrors.password}/>
                    </li>
                    <li>
                        <span className="block text-sm text-[--brown3] pb-2 mt-4">비밀번호 확인</span>
                        <EditInput name='confirm_password' type="password" required errors={state?.fieldErrors.confirm_password}/>
                    </li>
                    <li className="mb-6">
                        <span className="block text-sm text-[--brown3] pb-2 mt-4">마을 소개</span>
                        <textarea name="bio" defaultValue={bio || ""}
                            className="w-full min-h-52 text-sm p-3 bg-transparent border-[1px] border-[--brown4] rounded-md focus:outline-[--main]"
                        />
                    </li>
                </ul>
                <Button text="저장하기"/>
            </form>
        </>
    )
}
