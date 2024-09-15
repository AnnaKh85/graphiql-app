let isDebug = true;

function CHANGE_DEFAULT_DEBUG_VALUE(v: boolean) {
  isDebug = v;
}

function consoleLog(text: string) {
  if (isDebug) console.log("1:" + text);
}

function consoleLogError(text: string) {
  if (isDebug) console.error("1:" + text);
}

function consoleLogValue(value: any) {
  if (isDebug) console.log(["2:", value]);
}

function consoleLogValues(...values: any[]) {
  if (isDebug) console.log(["2:", ...values]);
}

function consoleLogValuesError(...values: any[]) {
  if (isDebug) console.log(["2:", ...values]);
}

export {
  CHANGE_DEFAULT_DEBUG_VALUE,
  consoleLog,
  consoleLogError,
  consoleLogValue,
  consoleLogValues,
  consoleLogValuesError,
};
