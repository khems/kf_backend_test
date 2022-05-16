import { makeEnhancedOutages } from "./main";
import {
  MOCK_ENHANCED_OUTAGES,
  MOCK_OUTAGES,
  MOCK_SITE_INFO,
} from "./testing/mockValues";

describe("makeEnhancedOutages", () => {
  describe("Successfully enhances outages with device names", () => {
    it("Returns array of enhanced outages", () => {
      expect(
        makeEnhancedOutages(
          MOCK_OUTAGES,
          new Date("2022-01-01T00:00:00.000Z"),
          MOCK_SITE_INFO
        )
      ).toMatchObject(MOCK_ENHANCED_OUTAGES);
    });
  });
});
