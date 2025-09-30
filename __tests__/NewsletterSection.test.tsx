import React from "react";
import { render, screen } from "@testing-library/react";
import NewsletterSection from "../NewsletterSection";

describe("NewsletterSection", () => {
  it("renders newsletter form", () => {
    render(<NewsletterSection />);
    expect(screen.getByRole("heading", { name: /Stay Connected/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Subscribe/i })).toBeInTheDocument();
  });
});
