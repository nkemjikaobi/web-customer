interface IPersonCard {
  card_id: string;
  migs_token: string;
  card_number: string;
  expiry_date: Date;
  card_status: string;
  verified: number;
  bank_id: number;
  bank_name: string;
  bank_logo_url: string;
}

export default IPersonCard;
