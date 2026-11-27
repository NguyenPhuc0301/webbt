import { beforeEach, describe, it, expect } from "vitest";
import { db } from "./db";
import { generatePosts } from "@/data/posts";
import { listMine, parseStatus, resolvePost, submitPost } from "./my-posts";

beforeEach(() => {
  db.posts = generatePosts(36);
  db.nextPostId = 37;
});

const input = {
  title: "Mất tai nghe không dây", kind: "Thất lạc", category: "Khác", place: "Thư viện",
  date: "2026-11-10", description: "Mô tả món đồ bị thất lạc đủ dài hơn hai mươi ký tự.",
  contactType: "Zalo", contact: "0912345678"
};

describe("nghiệp vụ tin của tôi", () => {
  it("phân trang 27 tin của sv01", () => {
    expect(listMine("sv01@ptit.edu.vn").total).toBe(27);
    expect(listMine("sv01@ptit.edu.vn").items).toHaveLength(8);
    expect(listMine("sv01@ptit.edu.vn").nextCursor).toBe(8);
    expect(listMine("sv01@ptit.edu.vn", undefined, 24).items).toHaveLength(3);
    expect(listMine("sv01@ptit.edu.vn", undefined, 24).nextCursor).toBeNull();
  });
  it("lọc pending còn ba tin và sv02 có chín tin", () => {
    expect(listMine("sv01@ptit.edu.vn", "pending").total).toBe(3);
    expect(listMine("sv02@ptit.edu.vn").total).toBe(9);
  });
  it("chỉ parse trạng thái hợp lệ", () => {
    expect(parseStatus("pending")).toBe("pending");
    expect(parseStatus("bad")).toBeUndefined();
  });
  it("tạo tin pending, thêm liên hệ và đưa lên đầu", () => {
    const post = submitPost("sv01@ptit.edu.vn", input);
    expect(post.status).toBe("pending");
    expect(post.description).toContain("Liên hệ: Zalo 0912345678");
    expect(db.posts[0].id).toBe(post.id);
  });
  it("resolve trả not-found, forbidden, not-approved và ok", () => {
    expect(resolvePost("sv01@ptit.edu.vn", 999)).toBe("not-found");
    expect(resolvePost("sv02@ptit.edu.vn", 2)).toBe("forbidden");
    expect(resolvePost("sv01@ptit.edu.vn", 5)).toBe("not-approved");
    expect(resolvePost("sv01@ptit.edu.vn", 2)).toBe("ok");
  });
});
