"use client";

import { PropsWithChildren, createContext, useState } from "react";
import {
  AuthProps,
  AuthContextType,
  getDefaultAutProps,
  getDefaultAuthContextType,
  getDefaultAutProps_authenticated,
} from "@app/lib/auth/auth.types";

export const AUTH_CONTEXT = createContext<AuthContextType>(
  getDefaultAuthContextType(),
);

type Props = {
  defaultAuth?: AuthProps;
};

export default function AuthProvider(props: PropsWithChildren<Props>) {
  const [auth, setAuth] = useState<AuthProps>(
    props.defaultAuth ?? getDefaultAutProps,
  ); //(getDefaultAutProps());

  return (
    <AUTH_CONTEXT.Provider value={{ authProps: auth, setAuthProps: setAuth }}>
      {props.children}
    </AUTH_CONTEXT.Provider>
  );
}
