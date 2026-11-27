import { it, expect } from "vitest";
import { formatDate } from "./format";

it("định dạng ngày theo dd/mm/yyyy", () => {
  expect(formatDate("2026-11-05")).toBe("05/11/2026");
});
