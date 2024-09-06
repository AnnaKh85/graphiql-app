'use client';

import React, {ErrorInfo, PropsWithChildren} from "react";
import {consoleLogValues} from "@app/lib/utils/consoleUtils";


// @deprecated
class ErrorBoundary extends React.Component<PropsWithChildren, {hasError: boolean}> {
    constructor(props: unknown) {
        super(props as {})

        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error: unknown) {

        return { hasError: true }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        consoleLogValues(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary

