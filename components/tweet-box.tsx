import { InputHTMLAttributes } from "react";

interface TweetProps {
    errors?: string[];
    name: string;
    onInputChange: (value: string) => void;
}

export default function TweetBox({
    name, errors = [], onInputChange, ...rest
}: TweetProps & InputHTMLAttributes<HTMLTextAreaElement> ){
    return(
        <>
            <textarea
                name={name} 
                onChange={(e) => onInputChange(e.target.value)} 
                className="w-full mt-6 focus:outline-none bg-[--background] min-h-[80vh] placeholder:text-[--brown3]"
                {...rest}
            />
        </>
    )
}
