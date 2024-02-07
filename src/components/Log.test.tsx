import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Log } from "./Log";

describe("Log Component", () => {
  it("should show a log header", () => {
    render(<Log data={undefined} loading={false} error={null} />);

    expect(screen.getByText("Log")).toBeDefined();
  });

  it("should show a Pause Log button by default", () => {
    render(<Log data={undefined} loading={false} error={null} />);

    expect(screen.getByText("Pause Log")).toBeDefined();
  });

  it("should change Pause to Resume when clicked", () => {
    render(<Log data={undefined} loading={false} error={null} />);

    fireEvent.click(screen.getByText("Pause Log"));

    expect(screen.getByText("Resume Log")).toBeDefined();
  });
});
