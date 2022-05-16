import "dotenv/config";
import { fetchOutages, fetchSiteInfo, postSiteOutages } from "./api/api";
import { makeEnhancedOutages } from "./enhanceOutages";
import { EnhancedOutage } from "./types";

const SITE_NAME: string = "norwich-pear-tree";

const main = async (siteName: string) => {
  const outages = await fetchOutages();
  if (outages instanceof Error) {
    console.error(`Failed to fetch outages: ${outages.message}`);
    return;
  }

  const site = await fetchSiteInfo(siteName);
  if (site instanceof Error) {
    console.error(
      `Failed to fetch site info for site ${siteName}: ${site.message}`
    );
    return;
  }

  const filterDate = new Date("2022-01-01T00:00:00.000Z");

  const enhancedOutages: EnhancedOutage[] = makeEnhancedOutages(
    outages,
    filterDate,
    site
  );

  const result = await postSiteOutages(siteName, enhancedOutages);
  if (result instanceof Error) {
    console.error(
      `Failed to post enhanced site outages for site ${siteName}: ${result.message}`
    );
    return;
  }
};

console.dir(main(SITE_NAME));
