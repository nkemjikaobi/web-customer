import { isServer } from "libs/utils/utils";

/**
 * Helps to route to the same Page with a different url query
 * @param {string} pageURL [The Page url]
 * @returns {undefined}
 */

export const samePageShallowRoute = (pageURL: string): any => {
  if (isServer()) return;

  // history.push(pageURL, {
  //   shallow: true,
  // });
};

/**
 * Prevents the Underlying content from showing for example when the mobile
 * SideMenu is visible
 * https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 *
 * @param {boolean} hide [The toggle param]
 * @returns {undefined}
 */
export const updateBodyScroll = (hide: any): any => {
  if (!isServer() && window) {
    if (hide) {
      document.body.style.overflowY = "hidden";
      document.body.style.position = "fixed";
      document.documentElement.style.position = "fixed";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.position = "static";
      document.documentElement.style.position = "static";
    }
  }
};
/**
 * Helper for smooth scrolling to a DOM element
 * @param {number} scrollTop [The position to scroll to]
 * @param {number} context [The scroll context ]
 * @param {boolean} smooth [Whether to use the smooth animation]
 * @returns {undefined}
 */
export const scrollToPosition = (
  scrollTop?: any,
  context?: any,
  smooth?: any
) => {
  const DOMContext = context || window;
  if (typeof DOMContext.scroll === "function") {
    try {
      DOMContext.scroll({
        top: scrollTop,
        behavior: smooth ? "smooth" : "auto",
      });
    } catch (e) {
      //for browsers that don't support ScrollToOptions
      DOMContext.scroll(0, scrollTop);
    }
  }
};
/**
 * Helper for smooth scrolling to the top
 * @param {number} scrollTop [The position to scroll to]
 * @returns {undefined}
 */
export const scrollToTop = (smooth: any) => {
  scrollToPosition(0, null, smooth);
};

/**
 * Helper for smooth scrolling to a DOM element
 * @param {Object} element [The element's selector. E.g. '#id', '.class']
 * @returns {undefined}
 */
export const scrollToElement = (element: any) => {
  if (element && element.offsetTop) {
    scrollToPosition(element.offsetTop);
  }
};

/**
 * Helper for smooth scrolling to a DOM element
 * @param {*} selector [The element's selector. E.g. '#id', '.class']
 * @returns {undefined}
 */
export const scrollToElementBySelector = (selector: any) => {
  const element = document.querySelector(selector);
  scrollToElement(element);
};
