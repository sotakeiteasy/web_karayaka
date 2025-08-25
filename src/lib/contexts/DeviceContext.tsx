import { Children, createContext, useState } from 'react';

export const DeviceContext = createContext({
  isMobile: false,
});

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = navigator as any;
  const uaDataMobile = !!nav.userAgentData?.mobile;
  const ua = (navigator.userAgent || '').toLowerCase();
  const isMobileUA = /(android|iphone|ipod|blackberry|iemobile|opera mini|windows phone|mobi|phone|smartphone)/i.test(
    ua
  );
  const isTabletUA = /(ipad|tablet|playbook|silk|kindle|nexus 7|nexus 10|kfvow|kftt|kfot|sm-t\d+)/i.test(ua);
  const isMobile = uaDataMobile || isMobileUA || isTabletUA;
  return <DeviceContext.Provider value={{ isMobile }}>{children}</DeviceContext.Provider>;
};
