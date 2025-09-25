import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";

describe("HeroSection", () => {
  it("renders title and buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText(/New Haiti Team 2075/i)).toBeInTheDocument();
    expect(screen.getByText(/Restoring Dignity/i)).toBeInTheDocument();
    expect(screen.getByText(/Read the Vision/i)).toBeInTheDocument();
    expect(screen.getByText(/Join the Movement/i)).toBeInTheDocument();
  });
});
