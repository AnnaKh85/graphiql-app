import React from "react";
import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import { vi, expect } from "vitest";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/react";
import { Response } from "@app/lib/components/Response/Response";
import { loadMessagesFile_en } from "./test_utils";
import { NextIntlClientProvider } from "next-intl";

vi.mock("@app/lib/utils/beautifyUtils", () => ({
  makeItBeautiful: vi.fn((value) => `beautiful-${value}`),
}));

describe("Response", () => {
  it("response status", async () => {
    const messages = await loadMessagesFile_en();

    render(
      <NextIntlClientProvider messages={messages} locale={"en"}>
        <Response status={"100500"} text="updated value" />
      </NextIntlClientProvider>,
    );

    expect(await screen.getAllByText("100500")).not.toHaveLength(0);
  });
});
