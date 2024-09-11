import {readFile} from "fs/promises";

export const loadMessagesFile_en = async () => {
    try {
        const jsonString = await readFile(`${__dirname}/../messages/en.json`, "utf8")
        const data = JSON.parse(jsonString);
        return data;
    } catch (error) {
        console.error("Failed to read MESSAGE FILE: ", error)
    }
    return undefined;
}


export const loadMessagesFile_ru = async () => {
    try {
        const jsonString = await readFile(`${__dirname}/../messages/ru.json`, "utf8")
        const data = JSON.parse(jsonString);
        return data;
    } catch (error) {
        console.error("Failed to read MESSAGE FILE: ", error)
    }
    return undefined;
}

