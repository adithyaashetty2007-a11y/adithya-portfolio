import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Visual portfolio landing page", () => {
  it("renders the main identity and easy navigation", () => {
    render(<App />);
    expect(screen.getAllByText("ADITHYA").length).toBeGreaterThan(0);
    expect(screen.getByText("SEE MY WORK")).toBeInTheDocument();
    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
    expect(screen.getByText("Library Management System")).toBeInTheDocument();
    expect(screen.getByText("Traffic Density Estimation")).toBeInTheDocument();
  });
});
