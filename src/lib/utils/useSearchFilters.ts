import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Ad, Filter } from '@/lib/types';
import { filterAds } from '@/lib/utils';

export function useSearchFilters() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchText, setSearchText] = useState('');
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [sortOption, setSortOption] = useState('price-cheap');

  const sortAds = (option: string, adsToSort: Ad[]) => {
    const sortedAds = [...adsToSort];
    const getPrice = (ad: Ad) => (ad.price.try ?? ad.price.rub)!;

    switch (option) {
      case 'price-cheap':
        return sortedAds.sort((a, b) => getPrice(a) - getPrice(b));
      case 'price-expensive':
        return sortedAds.sort((a, b) => getPrice(b) - getPrice(a));
      case 'area-small':
        return sortedAds.sort((a, b) => a.area - b.area);
      case 'area-large':
        return sortedAds.sort((a, b) => b.area - a.area);
      default:
        return sortedAds;
    }
  };

  const updateResults = useCallback(
    (currentFilter: Filter, currentSortOption: string, skipUrlUpdate = false) => {
      const ads = filterAds(currentFilter);
      setFilteredAds(sortAds(currentSortOption, ads));

      if (!skipUrlUpdate) {
        const query: Record<string, string> = {};

        if (currentFilter.type) query.type = currentFilter.type;
        if (currentFilter.country) query.country = currentFilter.country;
        if (currentFilter.city) query.city = currentFilter.city;
        if (currentFilter.district) query.district = currentFilter.district.join(',');
        if (currentFilter.propertyType) query.propertyType = currentFilter.propertyType;
        if (currentFilter.bedroom) query.bedroom = currentFilter.bedroom.join(',');
        if (currentFilter.address) query.address = currentFilter.address;
        if (currentFilter.floor) query.floor = currentFilter.floor.toString();

        if (currentFilter.minPrice) query.minPrice = currentFilter.minPrice.toString();
        if (currentFilter.maxPrice) query.maxPrice = currentFilter.maxPrice.toString();
        if (currentFilter.minArea) query.minArea = currentFilter.minArea.toString();
        if (currentFilter.maxArea) query.maxArea = currentFilter.maxArea.toString();

        // Save lang after page reload
        if (router.query.lang) {
          query.lang = router.query.lang as string;
        }

        router.replace({ pathname: router.pathname, query }, undefined);
      }
    },
    [router]
  );

  // Update if choose another type (sell/rent)
  useEffect(() => {
    if (!router.isReady) return;

    const initialFilter: Filter = {};

    const { type, country, city, district, propertyType, bedroom, address }: {
      type?: 'sale' | 'rent', country?: string, city?: string, district?: string, propertyType?: string, bedroom?: string, address?: string
    } = router.query;
    if (type) initialFilter.type = type;
    if (country) initialFilter.country = country;
    if (city) initialFilter.city = city;
    if (district) initialFilter.district = district.split(',');
    if (propertyType) initialFilter.propertyType = propertyType;
    if (bedroom) initialFilter.bedroom = bedroom.split(',');
    if (address) {
      initialFilter.address = address;
      setSearchText(address);
    }

    const { minPrice, maxPrice, minArea, maxArea, floor } = router.query;
    if (minPrice) initialFilter.minPrice = Number(minPrice);
    if (maxPrice) initialFilter.maxPrice = Number(maxPrice);
    if (minArea) initialFilter.minArea = Number(minArea);
    if (maxArea) initialFilter.maxArea = Number(maxArea);
    if (floor) initialFilter.floor = Number(floor);

    setFilter(initialFilter);
    updateResults(initialFilter, sortOption, true);
  }, [router.isReady, router.query, sortOption, updateResults]);

  const handleFilterChange = (name: string, value: string | number | string[] | undefined) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const newFilter = { ...filter };

    if (searchText.trim()) {
      newFilter.address = searchText.trim();
    } else if (newFilter.address) {
      delete newFilter.address;
    }

    Object.keys(newFilter).forEach((key) => {
      const k = key as keyof Filter;
      if (newFilter[k] === '') {
        delete newFilter[k];
      }
    });

    setAppliedFilters(newFilter);
    updateResults(newFilter, sortOption);
  };

  const resetFilters = () => {
    const typeParam = router.query.type ? `?type=${router.query.type}` : '';
    const langParam = router.query.lang
      ? typeParam
        ? `&lang=${router.query.lang}`
        : `?lang=${router.query.lang}`
      : '';
    window.location.href = `/search${typeParam}${langParam}`;
  };

  const handleSortOptionChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    updateResults(filter, newSortOption);
  };

  return {
    filter,
    appliedFilters,
    searchText,
    setSearchText,
    filteredAds,
    sortOption,
    handleFilterChange,
    applyFilters,
    resetFilters,
    handleSortOptionChange,
  };
}
