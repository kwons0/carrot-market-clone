"use server"

export async function handleForm( prevState: any, formData: FormData){
    const password = formData.get("password");
    
    if (password === "12345") {
        console.log(prevState, formData, "Password is correct - Run in the server");
        return {
            success: "Login successful!",
        };
    } else {
        console.log(prevState, formData, "Password is incorrect - Run in the server");
        return {
            errors: ["Wrong password"],
        };
    }
}