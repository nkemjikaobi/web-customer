/**
 *  Props for CategoriesComponent on the Home Page
 */

import CategoriesComponentModel from "./CategoriesComponentModel";

interface ICategoriesComponentProps {
  Title: string;
  Products: Array<CategoriesComponentModel>; // products to display for the category
}

export default ICategoriesComponentProps;
