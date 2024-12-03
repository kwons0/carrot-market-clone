export const EMAIL_REGAX = new RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/
)
export function CHECK_PASSWORD( password: string ){
    return /\d/.test(password)
}

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MIN_LENGTH_ERROR = `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`;

export const USERNAME_MIN_LENGTH = 1;
export const USERNAME_MIN_LENGTH_ERROR = `이름을 ${USERNAME_MIN_LENGTH}자 이상 입력해주세요.`;
