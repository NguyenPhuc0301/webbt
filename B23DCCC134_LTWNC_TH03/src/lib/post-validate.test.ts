import { describe, it, expect } from "vitest";
import { toPostInput, validatePost } from "./post-validate";

const valid = {
  title: "Mất tai nghe không dây", kind: "Thất lạc", category: "Khác", place: "Thư viện",
  date: "2020-01-01", description: "Mô tả món đồ bị thất lạc đủ dài hơn hai mươi ký tự.",
  contactType: "Zalo", contact: "0912345678"
};

describe("validatePost", () => {
  it("chấp nhận dữ liệu hợp lệ", () => expect(validatePost(valid)).toEqual({}));
  it("báo lỗi đầy đủ khi form trống", () => {
    const errors = validatePost(toPostInput({}));
    expect(errors).toMatchObject({ title: expect.any(String), kind: expect.any(String), category: expect.any(String), place: expect.any(String), date: expect.any(String), description: expect.any(String), contact: expect.any(String) });
  });
  it("không chấp nhận ngày tương lai", () => expect(validatePost({ ...valid, date: "2999-01-01" }).date).toBe("Ngày không được ở tương lai"));
  it("kiểm tra tiêu đề sau trim", () => expect(validatePost({ ...valid, title: "  ab " }).title).toBe("Tiêu đề tối thiểu 5 ký tự"));
  it("không chấp nhận tiêu đề quá dài", () => expect(validatePost({ ...valid, title: "x".repeat(81) }).title).toBe("Tiêu đề tối đa 80 ký tự"));
  it("không chấp nhận loại tin lạ", () => expect(validatePost({ ...valid, kind: "Khác" }).kind).toBe("Hãy chọn loại tin"));
  it("kiểm tra email sai định dạng", () => expect(validatePost({ ...valid, contactType: "Email", contact: "abc" }).contact).toBe("Email không hợp lệ"));
  it("chấp nhận email đúng định dạng", () => expect(validatePost({ ...valid, contactType: "Email", contact: "a@b.com" })).toEqual({}));
  it("kiểm tra số điện thoại thiếu số", () => expect(validatePost({ ...valid, contactType: "SĐT", contact: "09123" }).contact).toContain("10 chữ số"));
  it("không chấp nhận loại liên hệ lạ", () => expect(validatePost({ ...valid, contactType: "Telegram" }).contactType).toBe("Hãy chọn loại liên hệ"));
});
