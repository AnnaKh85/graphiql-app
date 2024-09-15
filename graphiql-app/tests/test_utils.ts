import { readFile } from "fs/promises";
import { VitestUtils } from "vitest";
import { UserCredential, Auth, User, IdTokenResult } from "@firebase/auth";
import { FirebaseError } from "firebase/app";

export const loadMessagesFile_en = async () => {
  try {
    const jsonString = await readFile(
      `${__dirname}/../messages/en.json`,
      "utf8",
    );
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Failed to read MESSAGE FILE: ", error);
  }
  return undefined;
};

export const loadMessagesFile_ru = async () => {
  try {
    const jsonString = await readFile(
      `${__dirname}/../messages/ru.json`,
      "utf8",
    );
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Failed to read MESSAGE FILE: ", error);
  }
  return undefined;
};

const getDefaultUserCredentials = () => {
  let user: User = {
    emailVerified: true,
    email: "",
    uid: "",
    displayName: "",
    isAnonymous: false,
    phoneNumber: "",
    photoURL: "",
    metadata: {
      creationTime: "",
      lastSignInTime: "",
    },
    providerData: [],
    providerId: "",
    refreshToken: "",
    tenantId: null,
    delete: async function () {},
    getIdToken: async function (forceRefresh?: boolean) {
      return "test";
    },
    getIdTokenResult: async function (forceRefresh?: boolean) {
      const r: IdTokenResult = {
        authTime: "string",
        expirationTime: "0",
        issuedAtTime: "string",
        signInProvider: null,
        signInSecondFactor: null,
        token: "string",
        claims: {},
      };
      return r;
    },
    reload: async function () {
      return;
    },
    toJSON(): object {
      return {};
    },
  };

  const res: UserCredential = {
    user,
    providerId: null,
    operationType: "signIn",
  };
  return res;
};

export const addMock_1 = (vi: VitestUtils) => {
  vi.mock("next/navigation", async () => {
    const actual = await vi.importActual("next/navigation");
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      })),
      useSearchParams: vi.fn(() => {
        const t = new URLSearchParams({});
        t.append("cXdl", "MTIz");
        return t;
      }),
      usePathname: vi.fn(() => {
        return "http://localhost:3001/restfulClient/GET/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE/IA?cXdl=MTIz";
      }),
    };
  });
  vi.mock("next-intl/server", async () => {
    const actual = await vi.importActual("next-intl/server");
    return {
      ...actual,
      getMessages: vi.fn(async () => {
        return { qwe: "123" };
      }),
      getLocale: vi.fn(async () => {
        return "en";
      }),
    };
  });

  vi.mock("next/headers", () => ({
    cookies: () => {
      return {
        get: function (COOKIE_NAME: string) {
          return "";
        },
        set: function (COOKIE_NAME: string, value: string) {},
      };
    }, // Use parseCookies from next-cookie
  }));

  vi.mock("firebase/auth", async () => {
    const actual = await vi.importActual("firebase/auth");
    return {
      ...actual,
      createUserWithEmailAndPassword: (
        auth: Auth,
        email: string,
        password: string,
      ) => {
        return getDefaultUserCredentials();
      },
      signInWithEmailAndPassword: (
        auth: Auth,
        email: string,
        password: string,
      ) => {
        if (email === "2@2.ru") {
          const e: FirebaseError = {
            code: "other",
            message: "error user/password",
            name: "",
            stack: "",
          };

          throw e;
        }
        if (email === "3@3.ru") {
          const e: FirebaseError = {
            code: "auth/invalid-credential",
            message: "error user/password2",
            name: "",
            stack: "",
          };
          throw e;
        }
        return getDefaultUserCredentials();
      },
      signOut: async () => {
        return "ok";
      },
    };
  });
};
