interface IBank {
  id: number;
  code: string;
  name: string;
  status: string;
  logo_url: string;
  is_mandate: number;
  nip_bank_code: string;
  is_bvn_mandate: string;
}

export default IBank;
