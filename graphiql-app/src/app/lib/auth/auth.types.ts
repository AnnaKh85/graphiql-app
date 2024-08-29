export type AuthProps = {
    isAuth: boolean,
    userId: string | null,
    email: string | null
};

export function getDefaultAutProps(): AuthProps {
    return {
        isAuth: false,
        userId: null,
        email: null
    };
}




export type AuthContextType = {
    authProps: AuthProps,
    setAuthProps: (authProps: AuthProps) => void | undefined
}

export function getDefaultAuthContextType(): AuthContextType {
    return {
        authProps: getDefaultAutProps(),
        setAuthProps: (a) => {}
    };
}
