import { Outage, Device, DeviceId, SiteInfo } from "./types";

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

export { makeEnhancedOutages };
