/* eslint-disable max-len */
/**
 * Class to hold the login form variables
 */

class LoginForm {
  user_identifier = "";
  password = "";
  content =
    "token customer { id email username group_id created_at updated_at is_active has_yudala_account is_konga_prime_customer is_b2b is_b2b_admin is_b2b_staff_member firstname lastname verification_status { is_verified phone_number } konga_prime_data { customer_id website_id store_id amount base_currency_code is_active created_at updated_at product_id  option_id  duration region_id orders_available orders_used weight_limit} addresses { id firstname lastname is_active telephone country { id name } region { id name } city area { id name} postcode street landmark is_default created_at updated_at}}";
}

export default LoginForm;
