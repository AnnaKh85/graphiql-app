'use client';

import React, {useState, useEffect} from "react";
import {notEmptyString} from "@app/lib/utils/stringUtils";

type Props = {
    message?: string,
    messages?: string[],
    closed?: () => void
}

export const ErrorMessage: React.FC<Props> = ({message, messages, closed}) => {
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(function() {
        const arr: string[] = [];
        if (message && notEmptyString(message)) {
            arr.push(message);
        }

        if (messages && messages.length) {
            messages.forEach(m => {
                arr.push(m);
            })
        }

        setErrors(arr);

    }, [message, messages])

    function renderMessages() {
        return errors.map((m, idx) => {
            return <p key={idx}>{m}</p>
        });
    }


    function clear() {
        setErrors([]);
        if (closed) {
            closed();
        }
    }

    if (errors.length === 0) {
        return <></>;
    }

    return (
        <div className={"row"}>
            <div className={"col-11"}>
                <div className="alert alert-danger" role="alert">
                    {renderMessages()}
                </div>
            </div>
            <div className={"col-1"}>
                <button className={"btn btn-outline-secondary"} type="button" onClick={clear}>
                    <i className="bi bi-bag-x"></i>
                </button>
            </div>
        </div>
    );
}

