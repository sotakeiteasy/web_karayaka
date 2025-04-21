import { useState, useEffect } from 'react';
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

  const updateResults = (
    currentFilter: Filter,
    currentSortOption: string,
    skipUrlUpdate = false
  ) => {
    const ads = filterAds(currentFilter, 'try');
    setFilteredAds(sortAds(currentSortOption, ads));

    if (!skipUrlUpdate) {
      const query: Record<string, string> = {};

      if (currentFilter.type) query.type = currentFilter.type;
      if (currentFilter.country) query.country = currentFilter.country;
      if (currentFilter.city) query.city = currentFilter.city;
      if (currentFilter.propertyType)
        query.propertyType = currentFilter.propertyType;
      if (currentFilter.address) query.address = currentFilter.address;
      if (currentFilter.floor) query.floor = currentFilter.floor.toString();

      if (currentFilter.minPrice)
        query.minPrice = currentFilter.minPrice.toString();
      if (currentFilter.maxPrice)
        query.maxPrice = currentFilter.maxPrice.toString();
      if (currentFilter.minArea)
        query.minArea = currentFilter.minArea.toString();
      if (currentFilter.maxArea)
        query.maxArea = currentFilter.maxArea.toString();

      // Сохраняем языковой параметр (чтобы сохранялся при сбросе фильтров)
      if (router.query.lang) {
        query.lang = router.query.lang as string;
      }

      router.replace({ pathname: router.pathname, query }, undefined);
    }
  };

  const initializeFiltersFromURL = () => {
    if (!router.isReady) return;
    
    const initialFilter: Filter = {};

    const { type, country, city, propertyType, address } = router.query;
    if (type) initialFilter.type = type as 'sale' | 'rent';
    if (country) initialFilter.country = country as string;
    if (city) initialFilter.city = city as string;
    if (propertyType) initialFilter.propertyType = propertyType as string;
    if (address) {
      initialFilter.address = address as string;
      setSearchText(address as string);
    }

    const { minPrice, maxPrice, minArea, maxArea, floor } = router.query;
    if (minPrice) initialFilter.minPrice = Number(minPrice);
    if (maxPrice) initialFilter.maxPrice = Number(maxPrice);
    if (minArea) initialFilter.minArea = Number(minArea);
    if (maxArea) initialFilter.maxArea = Number(maxArea);
    if (floor) initialFilter.floor = Number(floor);

    setFilter(initialFilter);
    updateResults(initialFilter, sortOption, true);
  };

  // Update if choose another type (sell/rent)
  useEffect(() => {
    initializeFiltersFromURL();
  }, [router.isReady, router.query.type]);

  const handleFilterChange = (
    name: string,
    value: string | number | undefined
  ) => {
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
