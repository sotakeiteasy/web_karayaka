import { ScrollAds } from './ScrollAds';
import { PaginatedAds } from './PaginatedAds';
import { Ad } from '@/lib/types';
import { useContext } from 'react';
import { DeviceContext } from '@/lib/contexts/DeviceContext';
export default function Ads({ filteredAds }: { filteredAds: Ad[] }) {
  const { isMobile } = useContext(DeviceContext);

  return (
    <>
      {!isMobile && <PaginatedAds itemsPerPage={8} ads={filteredAds} />}
      {isMobile && <ScrollAds itemsPerPage={8} ads={filteredAds} />}
    </>
  );
}
