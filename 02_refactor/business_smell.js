
// Age group calculators
function calculateYoungAdultPremium(customer, policy, basePremium) {
  if (customer.gender === 'male') {
    return calculateMaleYoungAdultPremium(customer, policy, basePremium);
  } else {
    return calculateFemaleYoungAdultPremium(customer, basePremium);
  }
}

function calculateMaleYoungAdultPremium(customer, policy, basePremium) {
  if (customer.drivingRecord === 'clean') {
    return calculateCleanRecordPremium(customer, policy, basePremium);
  } else if (customer.drivingRecord === 'minor') {
    return basePremium * 2.0;
  } else {
    return basePremium * 3.0;
  }
}

function calculateCleanRecordPremium(customer, policy, basePremium) {
  if (policy.type === 'full') {
    return calculateFullPolicyPremium(customer, basePremium);
  } else if (policy.type === 'liability') {
    return basePremium * 0.8;
  }
  return basePremium;
}

function calculateFullPolicyPremium(customer, basePremium) {
  if (customer.vehicleYear >= 2020) {
    return basePremium * 1.5 + 50;
  } else if (customer.vehicleYear >= 2015) {
    return basePremium * 1.3 + 30;
  } else {
    return basePremium * 1.1 + 20;
  }
}

function calculateFemaleYoungAdultPremium(customer, basePremium) {
  if (customer.drivingRecord === 'clean') {
    return basePremium * 1.2;
  } else {
    return basePremium * 1.8;
  }
}

function calculateMiddleAgedPremium(customer, policy, basePremium) {
  if (customer.maritalStatus === 'married') {
    return calculateMarriedPremium(customer, policy, basePremium);
  } else {
    return basePremium * 1.2;
  }
}

function calculateMarriedPremium(customer, policy, basePremium) {
  if (customer.children > 0) {
    if (policy.coverage >= 100000) {
      return basePremium * 0.9;
    } else {
      return basePremium * 1.1;
    }
  } else {
    return basePremium * 0.95;
  }
}

function calculateSeniorPremium(customer, basePremium) {
  if (customer.healthScore >= 80) {
    return basePremium * 1.1;
  } else if (customer.healthScore >= 60) {
    return basePremium * 1.4;
  } else {
    return basePremium * 2.0;
  }
}

function getAgeGroup(age) {
  if (age >= 18 && age <= 25) {
    return 'young_adult';
  } else if (age >= 26 && age <= 65) {
    return 'middle_aged';
  } else {
    return 'senior';
  }
}

function calculateInsurancePremium(customer, policy) {
  const basePremium = 100;
  const ageGroup = getAgeGroup(customer.age);
  
  let premium;
  switch (ageGroup) {
    case 'young_adult':
      premium = calculateYoungAdultPremium(customer, policy, basePremium);
      break;
    case 'middle_aged':
      premium = calculateMiddleAgedPremium(customer, policy, basePremium);
      break;
    case 'senior':
      premium = calculateSeniorPremium(customer, basePremium);
      break;
    default:
      premium = basePremium;
  }
  
  return Math.round(premium);
}

module.exports = { calculateInsurancePremium };
