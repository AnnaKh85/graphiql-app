function consoleLog(text: string) {
    console.log("1:" + text);
}

function consoleLogError(text: string) {
    console.error("1:" + text);
}



function consoleLogValue(value: any) {
    console.log(["2:", value]);
}

function consoleLogValues(...values: any[]) {
    console.log(["2:", ...values]);
}

function consoleLogValuesError(...values: any[]) {
    console.log(["2:", ...values]);
}


export {consoleLog, consoleLogError, consoleLogValue, consoleLogValues, consoleLogValuesError};
