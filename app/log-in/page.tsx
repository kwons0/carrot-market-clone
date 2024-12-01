"use client"

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { EMAIL_ICON, USER_ICON, PASSWORD_ICON } from "@/components/svg";

export default function Login() {
  
  const [state, trigger] = useFormState(login, null)

  return (
    <div className="flex flex-col gap-2 py-11">
      <h2 className="leading-tight text-xl mb-5">안녕하세요!<br/>이메일로 로그인해주세요.</h2>
      <form className="flex flex-col gap-4" action={trigger}>
        <Input name='email' type="email" placeholder="이메일 주소" required icon={EMAIL_ICON} 
          errors={state?.fieldErrors.email}/>
        <Input name='username' type="text" placeholder="이름" required icon={USER_ICON}
          errors={state?.fieldErrors.username}/>
        <Input name='password' type="password" placeholder="비밀번호" required 
          errors={state?.fieldErrors.password} 
          icon={PASSWORD_ICON}/>
        <Button text="로그인"/>
      </form>
    </div>
  );
}