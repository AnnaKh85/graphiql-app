import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import { loadMessagesFile_en } from "./test_utils";
import { metadata } from "@app/layout";
import { expect } from "vitest";
import Footer from "@app/lib/components/Footer/Footer";
import Header from "@app/lib/components/Header/Header";
import { getUserLocale, setUserLocale } from "@app/lib/locale/locale";
import {
  toBase64_fromString,
  toBase64_fromString_uri,
  fromBase64_toString,
  fromBase64_toString_uri,
} from "@app/lib/utils/convert";
import { makeItBeautiful } from "@app/lib/utils/beautifyUtils";
import Main from "@app/lib/components/Main/Main";
import NotFoundPage from "@app/not-found";
import Home from "@app/page";
import { ProgressProvider } from "@app/lib/components/ProgressProvider/ProgressProvider";
import { getAppLocalStorage } from "@app/lib/store/LocalStorageStore";
import { HistoryRecordType } from "@app/lib/types/types";
import { getDefaultAutProps_authenticated } from "@app/lib/auth/auth.types";

describe("MainPage", () => {
  it("main layout", async (props) => {
    const md = metadata;

    // render (
    //     <RootLayout params={{locale: "en"}}>
    //         <br>123</br>
    //     </RootLayout>
    // );
  });

  it("render Main", async (props) => {
    const messages = await loadMessagesFile_en();
    const da = {
      isAuth: true,
      userId: "1@2.ru",
      email: "1@2.ru",
    };

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <AuthProvider defaultAuth={da}>
          <Main />
        </AuthProvider>
      </NextIntlClientProvider>,
    );
  });

  it("render Footer", async (props) => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <AuthProvider defaultAuth={getDefaultAutProps_authenticated()}>
          <Footer />
        </AuthProvider>
      </NextIntlClientProvider>,
    );

    expect(
      await screen.findAllByText("Author", { exact: false }),
    ).not.toHaveLength(0);
  });

  it("render Header", async (props) => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <AuthProvider defaultAuth={getDefaultAutProps_authenticated()}>
          <Header />
        </AuthProvider>
      </NextIntlClientProvider>,
    );

    expect(await screen.findAllByRole("button")).not.toHaveLength(0);

    const dropDown = screen.getByTestId("locale-select-test");

    act(() => {
      fireEvent.change(dropDown, { target: { value: "Русский" } });
    });

    const btnLogout = screen.getByTestId("button-header-logout-test");
    act(() => {
      btnLogout.click();
    });
  });

  it("render Not Found", async (props) => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <AuthProvider defaultAuth={getDefaultAutProps_authenticated()}>
          <NotFoundPage />
        </AuthProvider>
      </NextIntlClientProvider>,
    );
  });

  it("render Home", async (props) => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <AuthProvider defaultAuth={getDefaultAutProps_authenticated()}>
          <Home />
        </AuthProvider>
      </NextIntlClientProvider>,
    );
  });

  it("render with Progress", async (props) => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <ProgressProvider>
          <AuthProvider defaultAuth={getDefaultAutProps_authenticated()}>
            <Home />
          </AuthProvider>
        </ProgressProvider>
      </NextIntlClientProvider>,
    );
  });

  it("userLocale testing", async (props) => {
    await getUserLocale();
    await setUserLocale("en");
  });

  it("converters testing", (props) => {
    fromBase64_toString(toBase64_fromString("test"));
    fromBase64_toString_uri(toBase64_fromString_uri("http://localhost:1"));
  });

  it("beautify testing", (props) => {
    makeItBeautiful('{"123": "qwe"}');
  });

  it("localStorage", (props) => {
    const ls = getAppLocalStorage();
    ls.addToHistory(
      {
        method: "GET",
        paramsBase64: [],
        url: "",
        headers: [],
      },
      HistoryRecordType.REST,
      "testUser",
    );
  });
});
