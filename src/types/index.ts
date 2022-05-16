type ErrorMessage = {
  message: string;
};

type Outage = {
  id: string;
  begin: string;
  end: string;
};

type SiteId = string;

type SiteInfo = {
  id: string;
  name: string;
  devices: Device[];
};

type DeviceId = string;

type Device = {
  id: DeviceId;
  name: string;
};

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
