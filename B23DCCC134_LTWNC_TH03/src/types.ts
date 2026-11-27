export type Role = "member" | "admin";
export type Kind = "Thất lạc" | "Nhặt được";
export type Category = "Thẻ sinh viên" | "Ví – giấy tờ" | "Điện thoại" | "Chìa khóa" | "Khác";
export type Place = "Tòa A2" | "Tòa B1" | "Tòa C3" | "Thư viện";
export type PostStatus = "pending" | "approved" | "hidden";

export interface Post {
  id: number;
  title: string;
  kind: Kind;
  category: Category;
  place: Place;
  date: string;
  description: string;
  authorEmail: string;
  status: PostStatus;
  resolved: boolean;
}
