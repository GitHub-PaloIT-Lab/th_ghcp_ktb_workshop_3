// ค่าคงที่สำหรับการคำนวณส่วนลด
const MEMBERSHIP_DISCOUNTS = {
  premium: 0.20,
  gold: 0.15,
  silver: 0.10
};

const SHIPPING_MULTIPLIERS = {
  premium: 0, // ส่งฟรี
  gold: 0.5,
  silver: 0.8
};

const LOYALTY_DISCOUNT = 0.05; // ส่วนลดสำหรับลูกค้าที่ใช้บริการ 5 ปีขึ้นไป
const MAX_DISCOUNT = 0.50; // ส่วนลดสูงสุด
const BASE_SHIPPING_RATE = 2.5; // ค่าส่งพื้นฐานต่อหน่วยน้ำหนัก

/**
 * คำนวณส่วนลดจากประเภทสมาชิก
 * @param {Object} user - ข้อมูลผู้ใช้
 * @returns {number} - ส่วนลดจากประเภทสมาชิก
 */
function getMembershipDiscount(user) {
  return MEMBERSHIP_DISCOUNTS[user.membershipType] || 0;
}

/**
 * คำนวณส่วนลดจากความภักดี (ใช้บริการนาน)
 * @param {Object} user - ข้อมูลผู้ใช้
 * @returns {number} - ส่วนลดจากความภักดี
 */
function getLoyaltyDiscount(user) {
  return user.yearsActive >= 5 ? LOYALTY_DISCOUNT : 0;
}

/**
 * คำนวณส่วนลดพื้นฐานจากสมาชิกและความภักดี
 * @param {Object} user - ข้อมูลผู้ใช้
 * @returns {number} - ส่วนลดพื้นฐาน
 */
function getBaseUserDiscount(user) {
  return getMembershipDiscount(user) + getLoyaltyDiscount(user);
}

/**
 * คำนวณส่วนลดสำหรับสินค้าแต่ละชิ้น
 * @param {Object} user - ข้อมูลผู้ใช้
 * @param {Object} product - ข้อมูลสินค้า
 * @returns {number} - ส่วนลดรวม (ไม่เกิน 50%)
 */
function calculateUserDiscount(user, product) {
  let discount = getBaseUserDiscount(user);
  
  // ส่วนลดเพิ่มเติมสำหรับสินค้าอิเล็กทรอนิกส์
  if (product.category === 'electronics') {
    discount += 0.02;
  }
  
  return Math.min(discount, MAX_DISCOUNT);
}

/**
 * คำนวณส่วนลดสำหรับการซื้อจำนวนมาก
 * @param {Object} user - ข้อมูลผู้ใช้
 * @param {Array} items - รายการสินค้า
 * @returns {number} - ส่วนลดรวม (ไม่เกิน 50%)
 */
function calculateBulkDiscount(user, items) {
  let discount = getBaseUserDiscount(user);
  
  // ส่วนลดเพิ่มเติมสำหรับการซื้อมากกว่า 10 ชิ้น
  if (items.length > 10) {
    discount += 0.03;
  }
  
  return Math.min(discount, MAX_DISCOUNT);
}

/**
 * คำนวณค่าจัดส่งตามประเภทสมาชิกและน้ำหนัก
 * @param {Object} user - ข้อมูลผู้ใช้
 * @param {number} weight - น้ำหนักสินค้า
 * @returns {number} - ค่าจัดส่ง
 */
function getShippingCost(user, weight) {
  const baseShipping = weight * BASE_SHIPPING_RATE;
  const multiplier = SHIPPING_MULTIPLIERS[user.membershipType];
  
  // ถ้าไม่มีประเภทสมาชิกที่กำหนด ใช้ค่าจัดส่งเต็มจำนวน
  if (multiplier === undefined) {
    return baseShipping;
  }
  
  // สมาชิก premium ได้ส่งฟรี
  if (multiplier === 0) {
    return 0;
  }
  
  return baseShipping * multiplier;
}

module.exports = { calculateUserDiscount, calculateBulkDiscount, getShippingCost };
