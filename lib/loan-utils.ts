export function calculateMonthlyPayment(
  principal: number,
  rate: number,
  numberOfMonths: number,
) {
  const rateResult = rate / 100;
  const futureValueFactor = Math.pow(1 + rateResult, numberOfMonths);
  const numerator = rateResult * futureValueFactor;
  const denominator = futureValueFactor - 1;
  return Math.max(Math.round(principal * (numerator / denominator)), 0);
}

export function calculateTotalRepayableAmount(
  principal: number,
  rate: number,
  numberOfMonths: number,
) {
  const total =
    calculateMonthlyPayment(principal, rate, numberOfMonths) * numberOfMonths;

  return Math.round(total);
}

export function calculateInterest(
  principal: number,
  rate: number,
  numberOfMonths: number,
) {
  const total =
    calculateMonthlyPayment(principal, rate, numberOfMonths) * numberOfMonths -
    principal;

  return Math.round(total);
}
