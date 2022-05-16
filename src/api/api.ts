import fetch from "node-fetch";

import { Outage, SiteInfo, SiteId, EnhancedOutage } from "../types";

const fetchOutages = async (): Promise<Outage[] | Error> => {
  const url = `${process.env.BASE_PATH}/outages`;
  const options = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
  };

  const results = await fetch(url, options);

  if (!results.ok) {
    return new Error(
      `Error ${results.status}: ${(await results.json()).message}`
    );
  }

  return results.json();
};

const fetchSiteInfo = async (siteId: SiteId): Promise<SiteInfo | Error> => {
  const url = `${process.env.BASE_PATH}/site-info/${siteId}`;
  const options = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
  };

  const results = await fetch(url, options);

  if (!results.ok) {
    return new Error(
      `Error ${results.status}: ${(await results.json()).message}`
    );
  }

  return results.json();
};

const postSiteOutages = async (
  siteId: SiteId,
  outages: EnhancedOutage[]
): Promise<void | Error> => {
  const url = `${process.env.BASE_PATH}/site-outages/${siteId}`;
  const options = {
    method: "POST",
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
    body: JSON.stringify(outages),
  };

  const result = await fetch(url, options);

  if (!result.ok) {
    return new Error(
      `Error ${result.status}: ${(await result.json()).message}`
    );
  }
};

export { fetchOutages, fetchSiteInfo, postSiteOutages };
