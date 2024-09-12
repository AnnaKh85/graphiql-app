import {readFile} from "fs/promises";
import {VitestUtils} from 'vitest';

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


export const addMock_1 = (vi: VitestUtils) => {
    vi.mock("next/navigation", async () => {
        const actual = await vi.importActual('next/navigation');
        return {
            ...actual,
            useRouter: vi.fn(() => ({
                push: vi.fn(),
                replace: vi.fn(),
            })),
            useSearchParams: vi.fn(() => {
                const t = new URLSearchParams({  });
                t.append("cXdl", "MTIz");
                return t;
            }),
            usePathname: vi.fn(() => {
                return "http://localhost:3001/restfulClient/GET/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE/IA?cXdl=MTIz";
            }),
        };
    });
    vi.mock("next-intl/server", async () => {
        const actual = await vi.importActual('next-intl/server');
        return {
            ...actual,
            getMessages: vi.fn(async () => {
                return {"qwe": "123"};
            }),
            getLocale: vi.fn(async () => {
                return "en";
            }),
        }
    })
}

