# 🚪 Playwright Test Automation (TypeScript)

Dự án tự động kiểm thử giao diện người dùng sử dụng [Playwright](https://playwright.dev/) và [TypeScript](https://www.typescriptlang.org/), áp dụng Page Object Model (POM) để tăng khả năng tái sử dụng và bảo trì.

---

## 📂 Cấu trúc dự án

```
├── tests/                  # Thư mục chứa các file test (*.spec.ts)
├── pages/                  # Page Object Models (POM)
├── constants/              # Các hằng số (menu, message, URL...)
├── utils/                  # Hàm tiện ích
├── data/                   # Test data (ví dụ: user info)
├── playwright.config.ts    # Cấu hình Playwright
├── .env                    # Biến môi trường
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Cài đặt

### 1. Cài dependency

```bash
npm install
```

### 2. Cài browsers (chỉ cần chạy 1 lần)

```bash
npx playwright install
```

---

## 🚀 Chạy test

### Tất cả test

```bash
npx playwright test
```

### Test theo file

```bash
npx playwright test tests/checkout.spec.ts
```

### Chạy với giao diện (UI)

```bash
npx playwright test --headed
```

---

## 📟 Xem báo cáo kết quả

```bash
npx playwright show-report
```

---

## 🌐 Biến môi trường

Tạo file `.env` tại gốc:

```
BASE_URL=https://demo.testarchitect.com
DEFAULT_EMAIL=test@example.com
DEFAULT_PASSWORD=123456
```

Sau đó bạn có thể sử dụng:

```ts
process.env.BASE_URL
```

---

## 📦 Scripts tiện dụng

| Lệnh                           | Mục đích                     |
| ------------------------------ | ---------------------------- |
| `npx playwright test`          | Chạy tất cả test             |
| `npx playwright test --headed` | Chạy test với trình duyệt mở |
| `npx playwright show-report`   | Hiển thị báo cáo             |

---

## 📌 Công nghệ sử dụng

- Playwright Test
- TypeScript
- Page Object Model (POM)
- Dotenv

---

## 📄 Giấy phép

MIT – tự do sử dụng & chia sẻ.

