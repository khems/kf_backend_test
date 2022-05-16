import { fetchOutages, fetchSiteInfo, postSiteOutages } from "./api";
import fetch from "node-fetch";
import {
  MOCK_ENHANCED_OUTAGES,
  MOCK_OUTAGES,
  MOCK_SITE_INFO,
} from "../testing/mockValues";

jest.mock("node-fetch");

const mockedFetch = jest.mocked(fetch, true);

describe("fetchOutages", () => {
  describe("Fetches outages successfully", () => {
    it("returns mock outages", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: true,
          json: () => Promise.resolve(MOCK_OUTAGES),
        })
      );
      expect(fetchOutages()).resolves.toBe(MOCK_OUTAGES);
    });
  });

  describe("Fails at fetching outages", () => {
    it("Return error 403", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: false,
          status: 403,
          json: () =>
            Promise.resolve({
              message: "Forbidden",
            }),
        })
      );
      expect(fetchOutages()).resolves.toHaveProperty(
        "message",
        "Error 403: Forbidden"
      );
    });
  });
});

describe("fetchSiteInfo", () => {
  describe("Fetches site info successfully", () => {
    it("returns site info", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: true,
          json: () => Promise.resolve(MOCK_SITE_INFO),
        })
      );
      expect(fetchSiteInfo("kingfisher")).resolves.toBe(MOCK_SITE_INFO);
    });
  });

  describe("Fails fetching site info", () => {
    it("Returns error 403", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: false,
          status: 403,
          json: () =>
            Promise.resolve({
              message: "Forbidden",
            }),
        })
      );
      expect(fetchSiteInfo("kingfisher")).resolves.toHaveProperty(
        "message",
        "Error 403: Forbidden"
      );
    });
  });
});

describe("postSiteOutages", () => {
  describe("Posts site outages successfully", () => {
    it("returns empty promise", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: true,
          json: () => Promise.resolve(MOCK_ENHANCED_OUTAGES),
        })
      );
      expect(
        postSiteOutages("kingfisher", MOCK_ENHANCED_OUTAGES)
      ).resolves.toBeUndefined();
    });
  });

  describe("Fails fetching posting site outages", () => {
    it("Returns error 403", () => {
      mockedFetch.mockReturnValueOnce(
        Promise.resolve({
          ...new Promise(() => {}),
          ok: false,
          status: 403,
          json: () =>
            Promise.resolve({
              message: "Forbidden",
            }),
        })
      );
      expect(
        postSiteOutages("kingfisher", MOCK_ENHANCED_OUTAGES)
      ).resolves.toHaveProperty("message", "Error 403: Forbidden");
    });
  });
});
