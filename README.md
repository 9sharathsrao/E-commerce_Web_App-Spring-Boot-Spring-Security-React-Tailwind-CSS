# 🛒 ClinkNBuy — E-Commerce Web Application

A multi-tier e-commerce web application with product listing, cart management, and order placement — built with React.js and Spring Boot.

---

## 🚀 Live Demo

**[Live Link](#)** ← *(Coming soon)*

---

## 🎥 Project Demo

https://github.com/user-attachments/assets/fb7b7e94-8ad8-4803-ab7b-16b573368a67

---

## 📸 Screenshots

### Login page
[![Login](screenshots/home.png)](screenshots/login_page.png)

### Login success
[![LoginSuccess](screenshots/product_details.png)](screenshots/login_pg_success.png)

### Registration page
[![Registration](screenshots/cart.png)](screenshots/register_pg.png)

### Registration OTP
[![RegistrationSuccess](screenshots/payment.png)](screenshots/register_pg_otp.png)

### OTP page
[![OTP](screenshots/orders.png)](screenshots/otp_pg.png)

### OTP success
[![OTPsuccess](screenshots/orders.png)](screenshots/otp_page_success.png)

---

## ⚙️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js, HTML5, CSS3, JavaScript (ES6+) |
| Backend | Java 17, Spring Boot |
| Database | MySQL |
| Authentication | Session-based login |
| Payment | Razorpay Integration |
| Tools | Postman, Git, GitHub, Docker |

---

## ✨ Features

- 🛍️ Product listing and browsing
- 🛒 Cart management — add, update, remove items
- 📦 Order placement and order history
- 🔐 User authentication with server-side validation
- 💳 Payment integration via Razorpay

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Create Admin, Seller or Customer |
| POST | `/api/v1/auth/verify-otp` | Admin Verification |
| POST | `/api/v1/seller/products` | Seller adding products |
| GET | `/api/v1/admin/products` | Admin get product |
| POST | `/api/v1/products` | Get products |
| POST | `/api/v1/admin/products/{id}` | Approve a product (Admin only) |

---

## 🗂️ Project Structure

```
E-commerce_Web_App/
│
├── clickNbuy-SpringBoot-RESTAPI/   # Spring Boot backend
│   ├── src/main/java/              # Controllers, Services, Repositories, Models
│   ├── src/main/resources/         # application.properties
│   ├── Dockerfile
│   ├── payment.html                # Razorpay payment page
│   └── pom.xml
│
├── clink-n-buy-frontend/           # React.js frontend
│   └── src/
│
└── .gitignore
```

---

## 🏃 Run Locally

### Prerequisites
- Java 17
- Node.js 18+
- MySQL
- Maven

### 1. Clone the repository

```bash
git clone https://github.com/9sharathsrao/E-commerce_Web_App.git
cd E-commerce_Web_App
```

### 2. Set up the database

```sql
CREATE DATABASE clinkNbuy_db;
```

Update `clickNbuy-SpringBoot-RESTAPI/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/clinkNbuy_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Run the backend

```bash
cd clickNbuy-SpringBoot-RESTAPI
./mvnw spring-boot:run
```

Runs at `http://localhost:8080`

### 4. Run the frontend

```bash
cd clink-n-buy-frontend
npm install
npm start
```

Runs at `http://localhost:3000`

---

## 👨‍💻 Author

**Sharath S**
- 📧 sharathsrao4529@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/hey-rao/)
- 🐙 [GitHub](https://github.com/9sharathsrao)
