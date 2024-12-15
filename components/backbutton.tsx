"use client"

import * as SVG from "@/components/svg";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Backbutton(){

    const [ fromTab, setFromTab ] = useState(false);
    const [ referrer, setReferrer ] = useState('');

    const cookies = Cookies.get('owner');

    useEffect(() => {
        if( cookies == 'tab-click'){
            setFromTab(true)
            Cookies.remove('owner');
        }

        setReferrer(document.referrer);

        // console.log( 'referrer = ',document.referrer )
      }, []);

    return(
        <>
        {
            !fromTab ?
            <span onClick={() => window.history.back()}><SVG.BACK_ICON classname="size-5 mb-5"/></span>
             : <div className="mb-5"></div>
        }
        </>
        
    )
}