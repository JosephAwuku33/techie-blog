import { render, screen } from "@testing-library/react";
import App from "./App";

it("should have welcome", () => {
  render(<App />);
  const message = screen.queryByTitle("Techie BloG");
  expect(message).toBeDefined();
});
