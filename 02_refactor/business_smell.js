/**
 * คำนวณเบี้ยประกันภัยตามข้อมูลลูกค้าและกรมธรรม์
 * @param {Object} customer - ข้อมูลลูกค้า
 * @param {Object} policy - ข้อมูลกรมธรรม์
 * @returns {number} - เบี้ยประกันภัยที่คำนวณได้ (ปัดเป็นจำนวนเต็ม)
 */
function calculateInsurancePremium(customer, policy) {
  const BASE_PREMIUM = 100;
  let basePremium = BASE_PREMIUM;
  
  // แยกการคำนวณตามช่วงอายุ
  if (isYoungAdult(customer.age)) {
    basePremium = calculateYoungAdultPremium(basePremium, customer, policy);
  } else if (isWorkingAge(customer.age)) {
    basePremium = calculateWorkingAgePremium(basePremium, customer, policy);
  } else {
    basePremium = calculateSeniorPremium(basePremium, customer);
  }
  
  return Math.round(basePremium);
}

/**
 * ตรวจสอบว่าเป็นวัยรุ่น/หนุ่มสาว (18-25 ปี)
 */
function isYoungAdult(age) {
  return age >= 18 && age <= 25;
}

/**
 * ตรวจสอบว่าเป็นวัยทำงาน (26-65 ปี)
 */
function isWorkingAge(age) {
  return age >= 26 && age <= 65;
}

/**
 * คำนวณเบี้ยประกันสำหรับวัยรุ่น/หนุ่มสาว
 */
function calculateYoungAdultPremium(basePremium, customer, policy) {
  if (customer.gender === 'male') {
    return calculateMaleYoungAdultPremium(basePremium, customer, policy);
  } else {
    return calculateFemaleYoungAdultPremium(basePremium, customer);
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับชายหนุ่ม
 */
function calculateMaleYoungAdultPremium(basePremium, customer, policy) {
  if (customer.drivingRecord === 'clean') {
    return calculateCleanRecordPremium(basePremium, customer, policy);
  } else if (customer.drivingRecord === 'minor') {
    return basePremium * 2.0; // เพิ่มเบี้ยสำหรับประวัติการขับขี่มีปัญหาเล็กน้อย
  } else {
    return basePremium * 3.0; // เพิ่มเบี้ยสำหรับประวัติการขับขี่แย่
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับประวัติการขับขี่ดี
 */
function calculateCleanRecordPremium(basePremium, customer, policy) {
  if (policy.type === 'full') {
    return calculateFullCoveragePremium(basePremium, customer);
  } else if (policy.type === 'liability') {
    return basePremium * 0.8; // ลดเบี้ยสำหรับประกันภาคบังคับเท่านั้น
  }
  return basePremium;
}

/**
 * คำนวณเบี้ยประกันแบบครอบคลุมตามปีของรถ
 */
function calculateFullCoveragePremium(basePremium, customer) {
  if (customer.vehicleYear >= 2020) {
    return basePremium * 1.5 + 50; // รถใหม่มาก เบี้ยสูง
  } else if (customer.vehicleYear >= 2015) {
    return basePremium * 1.3 + 30; // รถใหม่ปานกลาง
  } else {
    return basePremium * 1.1 + 20; // รถเก่า เบี้ยต่ำกว่า
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับสตรี
 */
function calculateFemaleYoungAdultPremium(basePremium, customer) {
  if (customer.drivingRecord === 'clean') {
    return basePremium * 1.2; // เบี้ยต่ำกว่าชายหากประวัติดี
  } else {
    return basePremium * 1.8; // เพิ่มเบี้ยหากประวัติไม่ดี
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับวัยทำงาน
 */
function calculateWorkingAgePremium(basePremium, customer, policy) {
  if (customer.maritalStatus === 'married') {
    return calculateMarriedPremium(basePremium, customer, policy);
  } else {
    return basePremium * 1.2; // โสดมีเบี้ยสูงกว่า
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับคนแต่งงาน
 */
function calculateMarriedPremium(basePremium, customer, policy) {
  if (customer.children > 0) {
    // มีลูก - ปรับเบี้ยตามระดับความคุ้มครอง
    if (policy.coverage >= 100000) {
      return basePremium * 0.9; // ลดเบี้ยสำหรับความคุ้มครองสูง
    } else {
      return basePremium * 1.1; // เพิ่มเบี้ยสำหรับความคุ้มครองต่ำ
    }
  } else {
    return basePremium * 0.95; // ลดเบี้ยเล็กน้อยสำหรับคู่แต่งงานไม่มีลูก
  }
}

/**
 * คำนวณเบี้ยประกันสำหรับผู้สูงอายุ
 */
function calculateSeniorPremium(basePremium, customer) {
  // ปรับเบี้ยตามคะแนนสุขภาพ
  if (customer.healthScore >= 80) {
    return basePremium * 1.1; // สุขภาพดี เบี้ยเพิ่มเล็กน้อย
  } else if (customer.healthScore >= 60) {
    return basePremium * 1.4; // สุขภาพปานกลาง เบี้ยเพิ่มปานกลาง
  } else {
    return basePremium * 2.0; // สุขภาพไม่ดี เบี้ยสูง
  }
}

module.exports = { calculateInsurancePremium };
