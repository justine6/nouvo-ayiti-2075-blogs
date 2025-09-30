import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectsSection from "../ProjectsSection";

describe("ProjectsSection", () => {
  it("renders projects list", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Our Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/Infrastructure/i)).toBeInTheDocument();
  });
});
