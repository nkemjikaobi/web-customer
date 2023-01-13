/* eslint-disable max-len */
import ICustomPage from "dto/KongaHealth/ICustomPage";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { GET_CUSTOM_PAGE } from "Http/Routes/Health";
import MarketplaceService from "./MarketplaceService";

class CustomPageService extends MarketplaceService {
  /**
   * Method to get custom pages
   * @param productName string
   * @returns customPages Array<ICustomPage>
   */
  public static GetCustomPages = async (
    productName: string
  ): Promise<Array<ICustomPage>> => {
    let customPages: Array<ICustomPage> = [];
    const payload = {
      url_key: `"${productName}"`,
      content:
        "page_title section_title filename image_alt link link_target variant theme html_box seo_text subtitle1 subtitle2 subtitle3 subtitle4 subtitle5 description1 description2 description3 description4 description5 link1 linkUrl1 link2 linkUrl2 link3 linkUrl3 link4 linkUrl4 link5 linkUrl5 buttonText buttonTextUrl imageSource1 imageAltText1 imageLink1 imageSource2 imageAltText2 imageLink2 imageSource3 imageAltText3 imageLink3 imageSource4 imageAltText4 imageLink4 imageSource5 imageAltText5 imageLink5 videoSource bgColor1 bgColor2 bgColor3 bgImageUrl products {" +
        " brand description express_delivery final_price konga_fulfilment_type image_full image_thumbnail images is_free_shipping is_pay_on_delivery name original_price pickup price product_type seller { banner id name phone_number url },  short_description sku special_price stock { in_stock max_sale_qty quantity quantity_sold }, url_key variants { attributes { code id label  options { code  id  value },  } products {  backorders  image_path  image_thumbnail_path  in_stock  options {  code  id  value  },  price  qty  sku  special_price  }, },}",
    };

    try {
      const {
        data: {
          data: { getCustomPage },
        },
      } = await axios.post(GET_CUSTOM_PAGE, payload);
      customPages = getCustomPage;
    } catch (error: any) {}
    return customPages;
  };
}

export default CustomPageService;
