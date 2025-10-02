import React from "react";
import { render, screen } from "@testing-library/react";
import TopBar from "../TopBar";

describe("TopBar", () => {
  it("renders navigation links", () => {
    render(<TopBar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
