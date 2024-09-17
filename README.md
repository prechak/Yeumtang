# ยืมตัง Application

Application เป็น Full-Stack สำหรับการยืมเงินรหว่างสองบุคคล

## ตารางหัวข้อ
- [การใช้งาน](#running-the-application)
  - [การใช้งานแบบปกติ](#running-normally)
  - [การใช้งานผ่าน Docker](#running-with-docker)

## การใช้งาน

### การใช้งานปกติ

1. **ทำการโคลน Repository และเข้าไปที่ client:**

   ```bash
   git clone git@github.com:prechak/Yeumtang.git
   cd Yeumtang/client
   ```

2. **ติดตั้ง Dependencies ฝั่ง Frontend:**

   ```bash
   npm install axios react react-dom react-loading-skeleton
   ```

3. **การเริ่มต้นใช้งาน Frontend**

   ```bash
   npm run dev
   ```

Frontend สามารถอ่านรายละเอียดได้ที่:
[https://github.com/prechak/Yeumtang/tree/main/client](https://github.com/prechak/Yeumtang/blob/main/client/README.md)

4. **ออกจาก client และเข้าไปที่ server:**

   ```bash
   cd ..
   cd Yeumtang/server
   ```

5. **ติดตั้ง Dependencies ฝั่ง Backend:**

   ```bash
   npm install @supabase/supabase-js cors dotenv express nodemon pg swagger-autogen swagger-ui-express
   ```

6. **การเริ่มต้นใช้งาน Frontend**
- Backend จำเป็นต้อง setup ไฟล์ `.env` ก่อนถึงจะใช้งานได้

   ```bash
   npm run start
   ```

Backend สามารถอ่านรายละเอียดได้ที่:
[https://github.com/prechak/Yeumtang/tree/main/client](https://github.com/prechak/Yeumtang/blob/main/server/README.md)

##

### การใช้งานผ่าน Docker

1. **Login เข้าไปที่ Docker**

   ```bash
   docker login
   ```
- ทำการใส่ User และ Password ให้เรียบร้อย

2. **Pull Docker Image จาก Docker Hub**

   ```bash
   docker pull prechakr/yeumtang-frontend
   ```

   ```bash
   docker pull prechakr/yeumtang-backend
   ```

3. **สร้าง Docker Network สำหรับ Frontend และ Backend ให้สื่อสารกันได้**

   ```bash
   docker network create app-network
   ```

4. **Run Backend Container**

   ```bash
   docker run -d --name yeumtang-backend --network app-network -p 8080:8080 prechakr/yeumtang-backend
   ```

5. **Run Frontend Container**

   ```bash
   docker run -d --name yeumtang-frontend --network app-network -p 80:80 prechakr/yeumtang-frontend
   ```
6. **ตรวจสอบการทำงานของ Containers**

   ```bash
   docker ps
   ```

7. **เข้าถึง Application**

- เปิดเว็บเบราว์เซอร์และเข้าไปที่ http://localhost:80 เพื่อเข้าถึง Frontend (Client)
- ใช้ Postman หรือ Curl เพื่อตรวจสอบ Backend API ที่ http://localhost:8080






