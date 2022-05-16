import "dotenv/config";
import { fetchOutages, fetchSiteInfo, postSiteOutages } from "./api/api";
import { processOutages } from "./processOutages";
import { EnhancedOutage } from "./types";

const SITE_NAME: string = "norwich-pear-tree";
const FILTER_DATE = "2022-01-01T00:00:00.000Z";

const main = async (siteName: string, filterDate: string) => {
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

  const enhancedOutages: EnhancedOutage[] = processOutages(
    outages,
    new Date(filterDate),
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

console.dir(main(SITE_NAME, FILTER_DATE));
