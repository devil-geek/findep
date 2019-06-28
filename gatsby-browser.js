/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Using anchors

/* exports.onRouteUpdate = location => {
  if (location.hash) {
    setTimeout(() => {
      document
        .querySelector(`${location.hash}`)
        .scrollIntoView({ behavior: "smooth" });
    }, 0); 
  }
};  */

/* import { anchorate } from "anchorate";

export const onRouteUpdate = () => {
  anchorate({
    scroller: function(element) {
      if (!element) return false;
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
  });
}; */
