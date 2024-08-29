function consoleLog(text: string) {
    console.log("1:" + text);
}

function consoleLogError(text: string) {
    console.error("1:" + text);
}


function consoleLogValues(...values: any[]) {
    console.log(["2:", ...values]);
}

function consoleLogValuesError(...values: any[]) {
    console.log(["2:", ...values]);
}


export {consoleLog, consoleLogError, consoleLogValues, consoleLogValuesError};
