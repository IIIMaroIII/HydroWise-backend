export const calculateDailyWaterIntakeForWomen = (weight, activeTime) => {
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
  const waterIntake = weight * 0.03 + activeTime * 0.4;
  return parseFloat(waterIntake.toFixed(2));
};
