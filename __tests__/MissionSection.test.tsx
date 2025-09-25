import React from "react";
import { render, screen } from "@testing-library/react";
import MissionSection from "../MissionSection";

describe("MissionSection", () => {
  it("renders mission heading and text", () => {
    render(<MissionSection />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Haiti/i)).toBeInTheDocument();
  });
});
