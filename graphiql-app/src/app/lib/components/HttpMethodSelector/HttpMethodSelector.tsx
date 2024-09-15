import React, {useState, HTMLProps, HTMLAttributes} from "react";
import {HttpMethodsFunc} from "@app/lib/types/types";


export type Props = {
    defaultValue?: string,
    onChange: (value: string) => void,
    disabled?: boolean
} & Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'>


export const HttpMethodSelector: React.FC<Props> = (props) => {
    const [value, setValue] = useState<string | undefined>(props.defaultValue);

    function handleChange(value: string) {
        setValue(value);
        props.onChange(value);
    }

    function renderAll(): React.ReactNode[] {
        return HttpMethodsFunc.getAllStr().map((value) =>
            <option key={value} value={value}>{value}</option>
        );
    }

    function getAllowedProps() {
        const {defaultValue, onChange, ...res} = props;
        return res;
    }

    return (

        <select className={"form-select"}
                value={value}
                onChange={e => handleChange(e.target.value)}
                {...getAllowedProps()}
        >
            {renderAll()}
        </select>

    );
}