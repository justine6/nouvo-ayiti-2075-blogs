import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders contact info", () => {
    render(<Footer />);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
