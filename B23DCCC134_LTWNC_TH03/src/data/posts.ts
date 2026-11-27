import type { Category, Kind, Place, Post, PostStatus } from "../types";

export const KINDS: Kind[] = ["Thất lạc", "Nhặt được"];
export const CATEGORIES: Category[] = ["Thẻ sinh viên", "Ví – giấy tờ", "Điện thoại", "Chìa khóa", "Khác"];
export const PLACES: Place[] = ["Tòa A2", "Tòa B1", "Tòa C3", "Thư viện"];

const THINGS: Record<Category, string[]> = {
  "Thẻ sinh viên": ["thẻ sinh viên", "thẻ ngân hàng"],
  "Ví – giấy tờ": ["ví da màu nâu", "căn cước công dân"],
  "Điện thoại": ["điện thoại Samsung", "điện thoại iPhone"],
  "Chìa khóa": ["chìa khóa xe máy", "chùm chìa khóa phòng"],
  "Khác": ["áo khoác màu đen", "tai nghe không dây"]
};

export const generatePosts = (count: number): Post[] =>
  Array.from({ length: count }, (_, i) => {
    const kind = KINDS[i % 2];
    const category = CATEGORIES[i % 5];
    const r = i % 6;
    const status: PostStatus = r === 4 ? "pending" : r === 5 ? "hidden" : "approved";
    const verb = kind === "Thất lạc" ? "Mất" : "Nhặt được";
    return {
      id: i + 1,
      title: `${verb} ${THINGS[category][Math.floor(i / 5) % 2]}${i >= 20 ? " (đăng lại)" : ""}`,
      kind,
      category,
      place: PLACES[(i * 3) % 4],
      date: `2026-11-${String(1 + (i % 16)).padStart(2, "0")}`,
      description: `Ai thấy xin liên hệ giúp, cảm ơn nhiều. Mã tin ${i + 1}.`,
      authorEmail: i % 4 === 0 ? "sv02@ptit.edu.vn" : "sv01@ptit.edu.vn",
      status,
      resolved: false
    };
  });
