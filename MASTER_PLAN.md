# Kế Hoạch Phát Triển & Quy Tắc Kiến Trúc (Travel Booking Landing Page)

Tài liệu này đóng vai trò là "Kim chỉ nam" cho toàn bộ quá trình xây dựng **Travel Booking Landing Page** (Frontend dành cho khách hàng). Hệ thống sẽ được xây dựng theo chuẩn chuyên nghiệp, tái sử dụng các quy tắc tốt nhất từ dự án CMS trước đó, kết hợp với các kỹ thuật tối ưu SEO và UX/UI cho khách hàng.

---

## 1. Công Nghệ & Kiến Trúc (Tech Stack)
Dự án được khởi tạo bằng Vite + React + TypeScript. Các thư viện lõi cần cài đặt:
- **Routing:** `react-router-dom` v6.
- **Data Fetching & Caching:** `@tanstack/react-query` (Chuẩn mực bắt buộc để tối ưu tốc độ tải trang).
- **State Management:** `zustand` (Dùng để quản lý Giỏ hàng / Đặt phòng toàn cục).
- **UI Framework & Styling:** 
  - `tailwindcss`: Dàn trang nhanh, linh hoạt, tối ưu responsive.
  - `antd`: Chỉ dùng cho các component phức tạp (như DatePicker, Pagination, Form Đặt phòng).
  - `lucide-react`: Bộ icon chuẩn hiện đại.
- **HTTP Client:** `axios` (Kèm interceptors xử lý Token giống CMS).

---

## 2. Quy Tắc Lập Trình (Coding Rules)

Để đảm bảo source code dễ bảo trì khi dự án phình to, bắt buộc tuân thủ các quy tắc sau:

### 2.1. Feature-First Structure (Chia thư mục theo tính năng)
Không nhóm file theo kiểu `components/`, `hooks/`, `api/` một cách lộn xộn. Mọi thứ liên quan đến một tính năng phải gom về một nơi.
```text
src/
 ┣ assets/          # Hình ảnh tĩnh, SVG
 ┣ components/      # Common UI (Button, Card, Header, Footer)
 ┣ config/          # Cấu hình biến môi trường, theme
 ┣ context/         # AuthContext, ThemeContext
 ┣ hooks/           # Custom hooks dùng chung (useWindowSize, useDebounce)
 ┣ layouts/         # MainLayout, AuthLayout, UserProfileLayout
 ┣ services/        # api-client.ts (Axios base)
 ┣ types/           # Định nghĩa Type/Interface toàn cục
 ┗ features/        # MỖI TÍNH NĂNG LÀ 1 MODULE RIÊNG:
    ┣ auth/         # Login, Register
    ┣ home/         # Banners, Search Form, Highlight
    ┣ hotels/       # Danh sách, Chi tiết, Đặt phòng
    ┣ destinations/ # Danh sách điểm đến
    ┗ profile/      # Lịch sử đặt phòng, thông tin cá nhân
```

### 2.2. Data Fetching Rule
- KHÔNG gọi `axios.get` trực tiếp bên trong `useEffect` của Component.
- Bắt buộc tạo Custom Hook bọc `useQuery` hoặc `useMutation` bên trong thư mục `queries` của từng Feature. 
*(Ví dụ: `src/features/hotels/queries/useHotels.ts`)*.

### 2.3. UI/UX & SEO
- Landing Page hướng tới khách hàng nên giao diện phải **WOW**, màu sắc tươi sáng (kế thừa màu Cyan `#06b6d4` chủ đạo).
- Tối ưu Responsive 100% trên thiết bị di động.
- Mọi trang phải có thẻ `title` và `meta description` phù hợp để tối ưu SEO.

---

## 3. Bản Đồ Tích Hợp Module (BE - FE Integration Mapping)

Dưới đây là các Module chính cần xây dựng ở Landing Page và API Backend tương ứng.

### Phase 1: Nền tảng & Trang Chủ (Trải nghiệm người dùng không cần đăng nhập)
| Module FE | Chức năng chi tiết | API Backend Tương Ứng |
| :--- | :--- | :--- |
| **Header & Footer** | Hiển thị menu, Thông tin công ty (lấy từ DB). | `GET /api/v1/settings` |
| **Home Banner** | Slider trình chiếu ảnh nổi bật. | `GET /api/v1/banners` (active) |
| **Destinations** | Hiển thị các điểm đến HOT nhất. | `GET /api/v1/destinations` |
| **Hotels Highlight**| Danh sách Khách sạn được đánh giá cao. | `GET /api/v1/hotels` |
| **Blog/News** | Cập nhật tin tức du lịch. | `GET /api/v1/blogs` |

### Phase 2: Tìm Kiếm & Chi Tiết (Core Business)
| Module FE | Chức năng chi tiết | API Backend Tương Ứng |
| :--- | :--- | :--- |
| **Search Engine** | Form tìm kiếm chung (Điểm đến, ngày tháng, số người). | *Truyền params xuống các danh sách* |
| **Hotels** | Lọc khách sạn theo giá, sao, tiện ích. Trang chi tiết khách sạn (Xem các phòng có sẵn). | `GET /api/v1/hotels/{id}`, `GET /api/v1/rooms/hotel/{id}` |
| **Tours/Packages** | Xem danh sách và chi tiết các gói du lịch. | `GET /api/v1/packages/{id}` |
| **Reviews** | Đọc đánh giá của khách hàng khác. | `GET /api/v1/reviews/{targetId}` |

### Phase 3: Xác Thực & Đặt Chỗ (Yêu cầu tính an toàn cao)
| Module FE | Chức năng chi tiết | API Backend Tương Ứng |
| :--- | :--- | :--- |
| **Auth** | Đăng nhập, Đăng ký, Quên mật khẩu. | `POST /api/v1/auth/*` |
| **Booking Flow** | Chọn phòng -> Nhập thông tin -> Thanh toán. | `POST /api/v1/bookings` |
| **Payment** | Tích hợp VNPay / Stripe (Nếu có). | `GET /api/v1/payments/*` |

### Phase 4: Quản Lý Cá Nhân (User Portal)
| Module FE | Chức năng chi tiết | API Backend Tương Ứng |
| :--- | :--- | :--- |
| **My Profile** | Đổi thông tin, đổi mật khẩu. | `PUT /api/v1/users/me` |
| **My Bookings** | Lịch sử đặt phòng (Chờ xác nhận, Hoàn thành, Đã hủy). | `GET /api/v1/bookings/my-bookings` |
| **Write Review** | Viết đánh giá sau chuyến đi. | `POST /api/v1/reviews` |

---

## 4. Kế Hoạch Hành Động (Next Steps)

1. **Step 1:** Cài đặt (`npm install`) các thư viện lõi: Tailwind, AntD, React Router, TanStack Query, Lucide, Axios, Zustand.
2. **Step 2:** Khởi tạo cấu trúc thư mục chuẩn, cấu hình biến môi trường `.env` và `api-client.ts`.
3. **Step 3:** Dựng Layout chung (Header, Footer, MainLayout) cho Landing Page với thiết kế hiện đại.
4. **Step 4:** Phát triển nội dung Trang chủ (Home Page) gọi dữ liệu động từ Backend (Banners, Settings).
