'use client';

import {useState, useEffect} from "react";

type Props = {
    beautifyTrigger: number,
    value: string,
    onChange: (v: string) => void
}


export default function TextEditor(props: Props) {
    const [value, setValue] = useState<string>(props.value);

    function handleChange(v: string) {
        setValue(v);
        props.onChange(v);
    }

    useEffect(function() {
        if (props.beautifyTrigger > 0) {
            try {
                let jsonTmp = JSON.parse(value);
                let v2 = JSON.stringify(jsonTmp, null, 4);
                setValue(v2);
            } catch (e) {
            }
        }
    }, [props.beautifyTrigger]);


    return <>
        <textarea className={"form-control"} value={value} onChange={e => handleChange(e.target.value)}></textarea>
    </>;
}

