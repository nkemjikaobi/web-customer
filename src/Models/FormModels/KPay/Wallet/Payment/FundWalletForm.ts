/**
 * Class to hold the fund wallet form parameters
 */
class FundWalletForm {
  Amount = 0;
  SourceOfFunds: number | null = null;
  PinCode: [number | null, number | null, number | null, number | null] = [
    null,
    null,
    null,
    null,
  ]; // Four digit pin code
}

export default FundWalletForm;
