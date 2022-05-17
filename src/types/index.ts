interface ErrorMessage {
  message: string;
}

interface Outage {
  id: string;
  begin: string;
  end: string;
}

type SiteId = string;

interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}

type DeviceId = string;

interface Device {
  id: DeviceId;
  name: string;
}

interface EnhancedOutage extends Outage {
  name: string;
}

export {
  Outage,
  ErrorMessage,
  SiteId,
  SiteInfo,
  Device,
  DeviceId,
  EnhancedOutage,
};
