'use client';

import {PropsWithChildren, createContext, useState} from "react";
import {
    AuthProps,
    AuthContextType,
    getDefaultAutProps,
    getDefaultAuthContextType,
    getDefaultAutProps_authenticated
} from "@app/lib/auth/auth.types";


export const AUTH_CONTEXT = createContext<AuthContextType>(getDefaultAuthContextType());


export default function AuthProvider(props: PropsWithChildren) {
    const [auth, setAuth] = useState<AuthProps>(getDefaultAutProps_authenticated); //(getDefaultAutProps());


    return <AUTH_CONTEXT.Provider value={{authProps: auth, setAuthProps: setAuth}}>{props.children}</AUTH_CONTEXT.Provider>;
}

