import IPageContent from "dto/ContentManager/IPageContent";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { GET_PAGE_CONTENT } from "Http/Routes/ContentManager";
import HttpService from "./HttpService";

class ContentManagementService extends HttpService {
  /**
   * Service method to get the page content
   * @param slug
   * @returns
   */
  public static GetPageContent = async (
    slug: string
  ): Promise<IPageContent | null> => {
    const payload = {
      slug,
      content:
        // eslint-disable-next-line max-len
        "id title slug description sectionData { offset limit total sections { id position viewport_id section { id title status_id cards { id title position status_id content { id data meta_data position status_id template_field { template_code template_label}}}}}}",
    };

    try {
      const {
        data: {
          data: { getPageContent },
        },
      } = await axios.post(GET_PAGE_CONTENT, payload);
      return getPageContent;
    } catch (error: any) {}
    return null;
  };
}

export default ContentManagementService;
