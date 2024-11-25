"use client"

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Home() {

  const [state, trigger] = useFormState(handleForm, null)
  return (
    <div className="flex flex-col gap-2 py-11">
      <div className="text-center text-xl">🔥</div> 
      <form className="flex flex-col gap-4" action={trigger}>
        <FormInput name='email' type="email" placeholder="Email" required  errors={[]} icon={<path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/>}/>
        <FormInput name='name' type="text" placeholder="Usename" required  errors={[]} icon={<path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>}/>
        <FormInput name='password' type="password" placeholder="Password" required 
          errors={state?.errors ?? []} icon={<path d="M280-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 120q-100 0-170-70T40-480q0-100 70-170t170-70q81 0 141.5 46T506-560h335l79 79-140 160-100-79-80 80-80-80h-14q-25 72-87 116t-139 44Z"/>}/>
        <FormBtn text="Login"/>
        { state?.success ? 
          <div className="bg-green-400 w-full p-5 flex items-center rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-7 mr-3" fill="#000000"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            Welcome back!
          </div> 
        : null }
      </form>
    </div>
  );
}
