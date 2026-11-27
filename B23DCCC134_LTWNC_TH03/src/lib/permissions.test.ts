import { describe, it, expect } from "vitest";
import { can } from "./permissions";

describe("can", () => {
  it("khách chỉ được xem tin", () => {
    expect(can(undefined, "post:view")).toBe(true);
    expect(can(undefined, "post:create")).toBe(false);
    expect(can(undefined, "post:resolve")).toBe(false);
    expect(can(undefined, "post:moderate")).toBe(false);
  });
  it("member được đăng và nhận lại nhưng không kiểm duyệt", () => {
    expect(can("member", "post:view")).toBe(true);
    expect(can("member", "post:create")).toBe(true);
    expect(can("member", "post:resolve")).toBe(true);
    expect(can("member", "post:moderate")).toBe(false);
  });
  it("admin kiểm duyệt nhưng không đăng tin", () => {
    expect(can("admin", "post:moderate")).toBe(true);
    expect(can("admin", "post:create")).toBe(false);
    expect(can("admin", "post:resolve")).toBe(false);
  });
});
