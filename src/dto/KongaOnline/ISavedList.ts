import ISavedListItem from "./ISavedListItem";

interface ISavedList {
  id: number;
  name: string;
  created_at: string;
  items: Array<ISavedListItem>;
}

export default ISavedList;
