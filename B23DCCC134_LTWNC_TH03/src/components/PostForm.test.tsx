import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from "./PostForm";
import type { PostFormState } from "@/lib/post-validate";

describe("PostForm", () => {
  it("hiện lỗi đúng trường khi action trả errors", async () => {
    const action = vi.fn(async (): Promise<PostFormState> => ({ errors: { title: "Tiêu đề tối thiểu 5 ký tự" }, values: { title: "ab" } }));
    render(<PostForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Đăng tin" }));
    expect(await screen.findByText("Tiêu đề tối thiểu 5 ký tự")).toBeInTheDocument();
  });
  it("gửi FormData chứa các trường liên hệ và loại tin", async () => {
    let received: FormData | undefined;
    const action = vi.fn(async (_prev: PostFormState, data: FormData): Promise<PostFormState> => {
      received = data;
      return { errors: {}, values: {}, message: "Đã gửi tin", ok: true };
    });
    render(<PostForm action={action} />);
    await userEvent.type(screen.getByLabelText("Tiêu đề"), "Mất tai nghe không dây");
    await userEvent.selectOptions(screen.getByLabelText("Loại tin"), "Thất lạc");
    await userEvent.selectOptions(screen.getByLabelText("Danh mục"), "Khác");
    await userEvent.selectOptions(screen.getByLabelText("Địa điểm"), "Thư viện");
    await userEvent.type(screen.getByLabelText("Ngày"), "2020-01-01");
    await userEvent.type(screen.getByLabelText("Mô tả"), "Mô tả món đồ bị thất lạc đủ dài hơn hai mươi ký tự.");
    await userEvent.selectOptions(screen.getByLabelText("Loại liên hệ"), "Email");
    await userEvent.type(screen.getByLabelText("Thông tin liên hệ"), "abc@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Đăng tin" }));
    expect(await screen.findByText("Đã gửi tin")).toBeInTheDocument();
    expect(action).toHaveBeenCalledTimes(1);
    expect(received?.get("kind")).toBe("Thất lạc");
    expect(received?.get("contactType")).toBe("Email");
    expect(received?.get("contact")).toBe("abc@example.com");
  });
  it("giữ lại tiêu đề khi server trả Không có quyền", async () => {
    const action = vi.fn(async (): Promise<PostFormState> => ({ errors: {}, values: { title: "Tiêu đề đã nhập" }, message: "Không có quyền" }));
    render(<PostForm action={action} />);
    await userEvent.type(screen.getByLabelText("Tiêu đề"), "Tiêu đề đã nhập");
    await userEvent.click(screen.getByRole("button", { name: "Đăng tin" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Không có quyền");
    expect(screen.getByLabelText("Tiêu đề")).toHaveValue("Tiêu đề đã nhập");
  });
  it("mặc định loại liên hệ là Zalo", () => {
    render(<PostForm action={vi.fn(async (): Promise<PostFormState> => ({ errors: {}, values: {} }))} />);
    expect(screen.getByLabelText("Loại liên hệ")).toHaveValue("Zalo");
  });
});
