import React from "react";
import config from "Configurations/configurations";
import { connectAutoComplete, Index } from "react-instantsearch-dom";
import HitsList from "./HitsList";

interface IAutoComplete {
  hits: any;
}

const AutoComplete: React.FunctionComponent<IAutoComplete> = (
  props: IAutoComplete
) => {
  return (
    <Index indexName={config.general.algolia.indexes.querySuggestionsIndex}>
      <HitsList
        hitLinkKey="query"
        hitLinkPrefix="/online-shopping/search?search="
        hits={props.hits}
        title="Suggestions"
      />
    </Index>
  );
};

export default connectAutoComplete(AutoComplete);
