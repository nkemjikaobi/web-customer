import React, { useState, useEffect } from "react";
import styles from "./kongaPrimeTerms.module.scss";
import { CONTENT } from "Helpers/Constants";
import ContentManagementService from "Http/Services/ContentManagementService";
import {
  normalizePageContent,
  getSanitizedHtml,
  normalizeContentCards,
} from "libs/utils/utils";

const KongaPrimeTerms = (props: any) => {
  const [terms, setTerms] = useState<any>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const kongaPrimeTermsSlug = CONTENT.KONGAPRIMETERMSSLUG;
    async function fetchKongaPrimeTermsSlug() {
      const KongaPrimeTerms = await ContentManagementService.GetPageContent(
        kongaPrimeTermsSlug
      )
        .then((res) => normalizePageContent(res, true))
        .then((response: any) => {
          const terms = response && normalizeContentCards(response.terms);
          return terms;
        })
        .catch((err) => null);
      setHasLoaded(true);
      const kongaPrimeTermsData =
        KongaPrimeTerms && KongaPrimeTerms.length && KongaPrimeTerms[0].terms;
      setTerms(kongaPrimeTermsData);
    }
    fetchKongaPrimeTermsSlug();
  }, []);

  if (!terms) return null;

  return (
    hasLoaded &&
    terms && (
      <section
        className={props.style ? styles.termswrapper : styles.termsWrapper}
      >
        <h4 className={props.style ? styles.termsheader : styles.termsHeader}>
          Terms and Conditions
        </h4>
        <div
          className={props.style ? styles.termstext : styles.termsText}
          dangerouslySetInnerHTML={getSanitizedHtml(terms)}
        />
      </section>
    )
  );
};

export default KongaPrimeTerms;
