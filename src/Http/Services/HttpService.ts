/* eslint-disable @typescript-eslint/ban-types */

import { PWA_HEADER, TOKEN_HOLDER } from "Helpers/Constants";

/**
 * Interface for the default headers content
 */
export interface IDefaultHeadersContent {
  source: string;
  token: string;
}

/**
 * Interface for the default headers
 */
export interface IPopulatedAuthenticatedHeader {
  headers: IDefaultHeadersContent;
}

/**
 * Class that handles http api requests
 */
abstract class HttpService {
  /**
   * Method to get the formatted header for an authenticated User
   * @param null
   * @returns
   */
  static GetPopulatedAuthenticatedHeader: Function =
    (): IPopulatedAuthenticatedHeader => ({
      headers: {
        source: PWA_HEADER,
        token: HttpService.GetLoggedInUserToken() ?? null,
      },
    });

  /**
   * Method to get the current logged in user from local stroage
   * @returns token string | null
   */
  static GetLoggedInUserToken: Function = (): string | null => {
    const response: string | null = localStorage.getItem(TOKEN_HOLDER);
    return response;
  };
}

export default HttpService;
