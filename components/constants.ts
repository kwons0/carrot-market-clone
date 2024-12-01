export const EMAIL_REGAX = new RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/
)
export function CHECK_PASSWORD( password: string ){
    return /\d/.test(password)
}