const fs = require('fs'); // นำเข้าโมดูล fs สำหรับจัดการไฟล์ระบบ
const path = require('path'); // นำเข้าโมดูล path สำหรับจัดการ path ของไฟล์

function readUserFile(filename) { // ฟังก์ชันสำหรับอ่านไฟล์จากชื่อไฟล์ที่ผู้ใช้ระบุ
  const filePath = `/uploads/${filename}`; // สร้าง path ของไฟล์ในโฟลเดอร์ uploads

  try { // เริ่มต้นบล็อก try สำหรับจัดการข้อผิดพลาด
    const content = fs.readFileSync(filePath, 'utf8'); // อ่านเนื้อหาไฟล์แบบ synchronous ในรูปแบบ utf8
    return content; // ส่งคืนเนื้อหาไฟล์
  } catch (error) { // ถ้ามีข้อผิดพลาดเกิดขึ้น
    console.error('Error reading file:', error.message); // แสดงข้อความข้อผิดพลาดใน console
    return null; // ส่งคืนค่า null
  }
}

function saveUserData(filename, data) { // ฟังก์ชันสำหรับบันทึกข้อมูลลงไฟล์
  const savePath = `./user_data/${filename}`; // สร้าง path สำหรับบันทึกไฟล์ในโฟลเดอร์ user_data

  fs.writeFileSync(savePath, data, 'utf8'); // เขียนข้อมูลลงไฟล์แบบ synchronous ในรูปแบบ utf8
  console.log(`Data saved to: ${savePath}`); // แสดงข้อความยืนยันการบันทึกไฟล์
}

function serveStaticFile(requestedFile) { // ฟังก์ชันสำหรับให้บริการไฟล์ static
  const staticPath = `/var/www/static/${requestedFile}`; // สร้าง path สำหรับไฟล์ static

  if (fs.existsSync(staticPath)) { // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
    return fs.readFileSync(staticPath); // ถ้ามีอยู่ อ่านและส่งคืนเนื้อหาไฟล์
  } else { // ถ้าไฟล์ไม่มีอยู่
    throw new Error('File not found'); // ขว้างข้อผิดพลาดว่าไม่พบไฟล์
  }
}

function downloadFile(userPath) { // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ตาม path ที่ผู้ใช้ระบุ
  const fullPath = path.join('./downloads/', userPath); // รวม path โฟลเดอร์ downloads กับ path ที่ผู้ใช้ระบุ
  return fs.readFileSync(fullPath); // อ่านและส่งคืนเนื้อหาไฟล์
}

module.exports = { readUserFile, saveUserData, serveStaticFile, downloadFile }; //
