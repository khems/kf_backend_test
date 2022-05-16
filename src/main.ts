import "dotenv/config";
import { fetchOutages, fetchSiteInfo, postSiteOutages } from "./api/api";
import { Outage, Device, DeviceId, EnhancedOutage, SiteInfo } from "./types";

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

const makeEnhancedOutages = (
  outages: Outage[],
  filterDate: Date,
  site: SiteInfo
) => {
  const devicesOnSite: DeviceId[] = site.devices.map(
    (device: Device) => device.id
  );
  return (
    outages
      // filter outages before the "filterDate"
      .filter((outage: Outage) => {
        return new Date(outage.begin) >= filterDate;
      })
      //Filter out outages that don't have an ID. I seperated these for readability
      .filter((outage: Outage) => {
        return devicesOnSite.includes(outage.id); // TODO: change id to deviceId
      })
      .map((outage: Outage) => {
        const device = site.devices.find(
          (device: Device) => device.id === outage.id
        );
        return {
          ...outage,
          name: device ? device.name : "Unknown Device", //Unknown Device should never happen
        };
      })
  );
};

console.dir(main(SITE_NAME));

export { makeEnhancedOutages };
