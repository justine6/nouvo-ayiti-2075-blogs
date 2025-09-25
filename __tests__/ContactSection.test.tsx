import React from "react";
import { render, screen } from "@testing-library/react";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders contact details and form", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("heading", { name: /Contact Us/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/info@nouvoayiti2075.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(918\) 640-8249/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });
});
