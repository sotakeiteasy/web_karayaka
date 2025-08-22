import { ScrollAds } from './ScrollAds';
import { PaginatedAds } from './PaginatedAds';
import { Ad } from '@/lib/types';
export default function Ads({ filteredAds }: { filteredAds: Ad[] }) {
  const nav = navigator as any;
  const uaDataMobile = !!nav.userAgentData?.mobile;
  const ua = (navigator.userAgent || '').toLowerCase();
  const isMobileUA = /(android|iphone|ipod|blackberry|iemobile|opera mini|windows phone|mobi)/i.test(ua);
  const isTabletUA = /(ipad|tablet|playbook|silk|kindle|nexus 7|nexus 10|kfvow|kftt|kfot|sm-t\d+)/i.test(ua);

  const renderMobile = uaDataMobile || isMobileUA || isTabletUA;
  return (
    <>
      {!renderMobile && <PaginatedAds itemsPerPage={8} ads={filteredAds} />}
      {renderMobile && <ScrollAds itemsPerPage={8} ads={filteredAds} />}
    </>
  );
}
