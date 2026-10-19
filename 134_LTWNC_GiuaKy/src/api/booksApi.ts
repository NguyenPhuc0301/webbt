import type { Book, ApiResult } from '../features/books/bookTypes';
const mockBooks: Book[] = [
 {id:'b1',title:'Lập trình TypeScript',author:'Nguyễn Văn A',category:'CNTT',year:2024,stock:3,total:4},
 {id:'b2',title:'React thực chiến',author:'Trần Minh B',category:'CNTT',year:2023,stock:2,total:3},
 {id:'b3',title:'Cấu trúc dữ liệu và giải thuật',author:'Lê Hoàng C',category:'CNTT',year:2022,stock:0,total:2},
 {id:'b4',title:'Kinh tế học căn bản',author:'Phạm Thu D',category:'Kinh tế',year:2021,stock:4,total:4},
 {id:'b5',title:'Nguyên lý quản trị',author:'Đỗ Hải E',category:'Kinh tế',year:2020,stock:2,total:2},
 {id:'b6',title:'English for Students',author:'John Smith',category:'Ngoại ngữ',year:2024,stock:3,total:3},
 {id:'b7',title:'Tiếng Nhật giao tiếp',author:'Yuki Tanaka',category:'Ngoại ngữ',year:2022,stock:1,total:2},
 {id:'b8',title:'Thiết kế giao diện web',author:'Vũ Lan F',category:'CNTT',year:2025,stock:5,total:5},
 {id:'b9',title:'Kinh tế vi mô',author:'Nguyễn Hà G',category:'Kinh tế',year:2023,stock:0,total:1}
];
export async function getBooks(shouldFail = false): Promise<ApiResult<Book[]>> {
  await new Promise(resolve => window.setTimeout(resolve, 500));
  if (shouldFail) return { ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' };
  return { ok: true, data: mockBooks.map(book => ({ ...book })) };
}