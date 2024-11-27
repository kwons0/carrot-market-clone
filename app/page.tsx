"use client"

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { EMAIL_ICON, USER_ICON, PASSWORD_ICON, SUCCESS_ICON } from "@/lib/svg";

type FieldErrors = {
  email?: string[];
  username?: string[];
  password?: string[];
};

export default function Home() {
  
  const arr={ errors: [], success: false };
  const [state, trigger] = useFormState(handleForm, arr)
  
  const getFieldErrors = (field: keyof FieldErrors) => {
    if (Array.isArray(state.errors) || !state.errors?.fieldErrors) {
      return [];
    }
    return state.errors.fieldErrors[field] || [];
  };

  return (
    <div className="flex flex-col gap-2 py-11">
      <div className="text-center text-xl">🔥</div> 
      <form className="flex flex-col gap-4" action={trigger}>
        <FormInput name='email' type="email" placeholder="Email" required icon={EMAIL_ICON} 
          errors={getFieldErrors("email")}/>
        <FormInput name='username' type="text" placeholder="Usename" required icon={USER_ICON}
          errors={getFieldErrors("username")}/>
        <FormInput name='password' type="password" placeholder="Password" required 
          errors={getFieldErrors("password")} 
          
          icon={PASSWORD_ICON}/>
        <FormBtn text="Login"/>
        { state?.success ? 
          <div className="bg-green-400 w-full p-5 flex items-center rounded-xl">{SUCCESS_ICON} Welcome back!</div> 
        : null }
      </form>
    </div>
  );
}
