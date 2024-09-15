// Import necessary modules and components
import { render, screen } from "@testing-library/react";
import RestfulClientPage from "@app/(clients)/restfulClient/[method]/[[...paramsBase64]]/page";
import { vi } from "vitest";

// Mock the dependencies for the test
vi.mock(
  "@app/lib/components/HttpMethodSelector/HttpMethodSelector",
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      // Mock the HttpMethodSelector component
      default: ({ onChange, defaultValue, disabled }) => (
        <select
          data-testid="http-method-selector"
          value={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      ),
    };
  },
);

// Test case for RestfulClientPage component
describe("RestfulClientPage", () => {
  it.skip("should correctly initialize request type and URL from params", () => {
    // Render the component with mock props
    render(
      <RestfulClientPage
        params={{ method: "GET", paramsBase64: "encodedURL" }} // Mock params
      />,
    );

    // Check if HttpMethodSelector renders with correct default value
    const methodSelector = screen.getByTestId("http-method-selector");
    expect(methodSelector).toHaveValue("GET");

    // Simulate changing the method in the selector
    methodSelector.value = "POST";
    expect(methodSelector).toHaveValue("POST");

    // Further assertions can be added as needed
  });
});
