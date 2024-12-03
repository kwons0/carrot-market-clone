"use client"

import { createAccount } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { EMAIL_ICON, USER_ICON, PASSWORD_ICON, BACK_ICON, CONFIRM_PASSWORD_ICON } from "@/components/svg";
import Link from "next/link";

export default function CreateAccount(){
  const [state, trigger] = useFormState(createAccount, null)

  return(
    <div className="flex flex-col gap-2 py-11">
      <Link href="/browse"><BACK_ICON classname="size-5 mb-5"/></Link>
      <h2 className="leading-tight text-xl mb-5">안녕하세요!<br/>이메일로 가입해주세요.</h2>
      <form className="flex flex-col gap-4" action={trigger}>
        <Input name='email' type="email" placeholder="이메일 주소" required icon={EMAIL_ICON} 
          errors={state?.fieldErrors.email}
        />
        <Input name='username' type="text" placeholder="이름" required icon={USER_ICON}
          errors={state?.fieldErrors.username}
        />
        <Input name='password' type="password" placeholder="비밀번호" required icon={PASSWORD_ICON}
          errors={state?.fieldErrors.password} 
        />
        <Input name='confirm_password' type="password" placeholder="비밀번호 확인" required icon={CONFIRM_PASSWORD_ICON}
          errors={state?.fieldErrors.confirm_password} 
        />
        <Button text="시작하기"/>
      </form>
    </div>
  )
}




