'use client';

import {useState, useEffect} from "react";
import {makeItBeautiful} from "@app/lib/utils/beautifyUtils";

type Props = {
    beautifyTrigger: number,
    value: string,
    onChange: (v: string) => void,
    onBlur?: () => void,
    disabled?: boolean
}


export default function TextEditor(props: Props) {
    const [value, setValue] = useState<string>(props.value);

    function handleChange(v: string) {
        setValue(v);
        props.onChange(v);
    }

    useEffect(function() {
        if (props.beautifyTrigger > 0) {
            const resBeaut = makeItBeautiful(value);
            if (resBeaut !== value) {
                setValue(resBeaut);
            }
        }
    }, [props.beautifyTrigger]);

    useEffect(function() {
        setValue(props.value);
    }, [props.value]);


    return <>
        <textarea className={"form-control"}
                  value={value}
                  onChange={e => handleChange(e.target.value)}
                  onBlur={props.onBlur}
                  style={{"minHeight": "150px"}}
                  disabled={!!props.disabled}
        ></textarea>
    </>;
}

