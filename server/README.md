# ยืมตัง Application API

Application นี้เป็น Backend Service สำหรับการยืมเงินรหว่างสองบุคคล

## ตารางหัวข้อ

- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [Endpoints](#endpoints)
- [โครงสร้างฐานข้อมูล](#โครงสร้างฐานข้อมูล)
- [ตัวอย่างผลลัพธ์ของ API](#ตัวอย่างผลลัพธ์ของ-api)
- [Dependencies](#dependencies)

## การติดตั้ง

1. **ทำการโคลน Repository:**

   ```bash
   git clone git@github.com:prechak/Yeumtang.git
   cd Yeumtang/server
   ```

2. **ติดตั้ง Dependencies:**

   ```bash
   npm install @supabase/supabase-js cors dotenv express nodemon pg swagger-autogen swagger-ui-express
   ```

3. **ตั้งค่า environment**

สร้างไฟล์ .env ขึ้นมาที่ root directory และใส่ตัวแปรตามด้านล่าง (ข้อมูล database จะแนบไปทางอีเมลล์)

```bash
 MY_USER=your_db_user
 MY_PASSWORD=your_db_password
 MY_HOSTNAME=your_db_host
 MY_PORT=your_db_port
 MY_DB=your_db_name
```

## การใช้งาน

1. **เริ่มต้นเซิร์ฟเวอร์**

```bash
npm run start
```

เซิร์ฟเวอร์จะทำงานที่พอร์ต 8080 (หรือพอร์ตอื่นที่กำหนดไว้ใน .env)

2. **ตรวจสอบสถานะ**

เพื่อตรวจสอบว่าเซิร์ฟเวอร์และการเชื่อมต่อฐานข้อมูลกำลังทำงานอยู่

```bash
curl http://localhost:8080/health
```

จะได้รับการตอบกลับ:

```json
{ "message": "Database connection is healthy" }
```

## Endpoint

### การยืมเงิน

- **URL:**
  `/api/borrow`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "lenderId": 1,
    "borrowerId": 2,
    "amount": 300
  }
  ```
- **Response:** `201 Created` พร้อมรายละเอียดธุรกรรม หรือ `400 Bad Request` หากเกิดข้อผิดพลาดในการตรวจสอบข้อมูล

```json
{
  "transaction_id": 94,
  "lender_id": 1,
  "borrower_id": 2,
  "amount": "300.00",
  "transaction_type_id": 1,
  "timestamp": "2024-09-17T03:43:41.167Z",
  "status": "completed"
}
```

### การคืนเงิน

- **URL:**
  `/api/repay`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "lenderId": 1,
    "borrowerId": 2,
    "amount": 300
  }
  ```
- **Response:** `201 Created` พร้อมรายละเอียดธุรกรรม หรือ `400 Bad Request` หากเกิดข้อผิดพลาดในการตรวจสอบข้อมูล

```json
{
  "transaction_id": 83,
  "lender_id": 1,
  "borrower_id": 2,
  "amount": "400.00",
  "transaction_type_id": 2,
  "timestamp": "2024-09-16T23:06:13.650Z",
  "status": "completed"
}
```

### สรุปการยืม/คืนเงิน

- **URL:** `/api/summary`
- **Method:** `GET`
- **Query Parameters:** `userId`
- **Response:** `200 OK` พร้อมรายการธุรกรรม หรือ `404 Not Found` หากไม่มีธุรกรรมสำหรับ `userId` ที่ให้มา

```json
{
  "total_borrowed": "1409.00",
  "total_repaid": "600.00"
}
```

### สรุปการทำธุรกรรม

- **URL:** `/api/transactions`
- **Method:** `GET`
- **Query Parameters:** `userId` (Optional - หากไม่ใส่ userId จะเป็นการนำธุรกกรมทั้งหมดออกมาแสดง)
- **Response:** `200 OK` พร้อมรายการธุรกรรม หรือ `404 Not Found` หากไม่มีธุรกรรมสำหรับ `userId` ที่ให้มา

```json
{
  "transaction_id": 94,
  "user_id": 2,
  "user_name": "B",
  "user_role": "borrower",
  "lender_name": "A",
  "borrower_name": "B",
  "amount": "300.00",
  "timestampz": "2024-09-17T03:43:41.167Z",
  "transaction_type_id": 1,
  "transaction_type_name": "borrow",
  "lender_id": 1,
  "borrow_id": 2
}
```

### Swwgger Documentation

- **URL:** `/api-docs/`

## โครงสร้างฐานข้อมูล

### ตารางผู้ใช้

```sql
CREATE TABLE public.users (
  user_id SERIAL NOT NULL,
  name VARCHAR(100) NULL,
  email VARCHAR(100) NULL,
  balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (user_id)
);
```

### ตารางธุรกรรม

```sql
CREATE TABLE public.transactions (
  transaction_id SERIAL NOT NULL,
  lender_id INTEGER NULL,
  borrower_id INTEGER NULL,
  amount NUMERIC(10, 2) NULL,
  transaction_type_id INTEGER NULL,
  timestamp TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT now(),
  status VARCHAR(20) NULL DEFAULT 'completed',
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (borrower_id) REFERENCES users (user_id),
  FOREIGN KEY (lender_id) REFERENCES users (user_id),
  FOREIGN KEY (transaction_type_id) REFERENCES transaction_types (transaction_type_id)
);
```

### ตารางประเภทธุรกรรม

```sql
CREATE TABLE public.transaction_types (
transaction_type_id SERIAL NOT NULL,
name VARCHAR(20) NULL,
PRIMARY KEY (transaction_type_id)
);
```

## Dependencies

- `@supabase/supabase-js`
- `cors`
- `dotenv`
- `express`
- `nodemon`
- `pg`
- `swagger-autogen`
- `swagger-ui-express`
