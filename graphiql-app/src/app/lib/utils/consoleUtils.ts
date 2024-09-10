const isDebugEnabled = true;



function consoleLog(text: string) {
    if (isDebugEnabled)
        console.log("1:" + text);
}

function consoleLogError(text: string) {
    if (isDebugEnabled)
        console.error("1:" + text);
}



function consoleLogValue(value: any) {
    if (isDebugEnabled)
        console.log(["2:", value]);
}

function consoleLogValues(...values: any[]) {
    if (isDebugEnabled)
        console.log(["2:", ...values]);
}

function consoleLogValuesError(...values: any[]) {
    if (isDebugEnabled)
        console.log(["2:", ...values]);
}


export {consoleLog, consoleLogError, consoleLogValue, consoleLogValues, consoleLogValuesError};
