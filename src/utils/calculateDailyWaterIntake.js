export const calculateDailyWaterIntake = (gender, weight, activeTime) => {
  if (
    typeof weight !== 'number' ||
    weight <= 0 ||
    typeof activeTime !== 'number' ||
    activeTime < 0
  ) {
    throw new Error(
      'Invalid input: weight must be a positive number and active time must be a non-negative number.',
    );
  }

  if (gender === 'woman') {
    return parseFloat((weight * 0.03 + activeTime * 0.4).toFixed(2));
  } else if (gender === 'man') {
    return parseFloat((weight * 0.04 + activeTime * 0.6).toFixed(2));
  } else {
    throw new Error('Invalid gender: gender must be either "woman" or "man".');
  }
};
