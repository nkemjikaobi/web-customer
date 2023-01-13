import config from "Configurations/configurations";
import * as sha512 from "sha512";

export const generateHash = (
  reference: string,
  amount: number,
  publicKey?: string
) => {
  const amountInKobo = amount * 100;
  const token = `${amountInKobo}|${publicKey}|${reference}`;
  return sha512(token).toString("hex");
};
