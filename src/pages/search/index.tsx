import styles from "./index.module.scss";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useTranslation, useLanguageQuery } from "next-export-i18n";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent, useMemo } from "react";

import PaginatedAds from "./PaginatedAds/PaginatedAds";
import { filterAds, getUniqueFilterValues } from "@/lib/utils";
import { Ad, Filter } from "@/lib/types";

interface SelectOption {
  value: string;
  label: string;
}

interface FilterChangeEvent {
  target: {
    name: string;
    value: string | number | undefined;
  };
}

// Динамически импортируем React Select с отключенным SSR
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

// Добавляем интерфейс для метатегов
interface SearchPageProps {
  metaTags: {
    ru: {
      title: string;
      description: string;
      keywords: string;
    };
    en: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

export default function Search({ metaTags }: SearchPageProps) {
  const router = useRouter();
  const {
    type,
    country,
    city,
    propertyType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    floor,
    parking,
    address,
  } = router.query;

  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || "ru";
  const meta = metaTags[lang];

  const [searchText, setSearchText] = useState("");
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [appliedFilter, setAppliedFilter] = useState<Filter>({});
  const [sortOption, setSortOption] = useState("price-cheap");
  const [filterValues, setFilterValues] = useState<{
    countries: { en: string; ru: string; tr: string }[];
    cities: { en: string; ru: string; tr: string }[];
    propertyType: { en: string; ru: string; tr: string }[];
    features: string[];
  }>({
    countries: [],
    cities: [],
    propertyType: [],
    features: [],
  });
  const [urlUpdatePending, setUrlUpdatePending] = useState(false);

  const sortAds = (option: string, adsToSort: Ad[]) => {
    switch (option) {
      case "price-cheap":
        return [...adsToSort].sort((a, b) => {
          const aPrice = (a.price.try ?? a.price.rub)!;
          const bPrice = (b.price.try ?? b.price.rub)!;
          return aPrice - bPrice;
        });

      case "price-expensive":
        return [...adsToSort].sort((a, b) => {
          const aPrice = (a.price.try ?? a.price.rub)!;
          const bPrice = (b.price.try ?? b.price.rub)!;
          return bPrice - aPrice;
        });
      case "area-small":
        return [...adsToSort].sort((a, b) => a.area - b.area);
      case "area-large":
        return [...adsToSort].sort((a, b) => b.area - a.area);
      default:
        return adsToSort;
    }
  };

  // Инициализация фильтров из URL
  useEffect(() => {
    if (router.isReady) {
      const initialFilter: Filter = {};

      if (address) {
        initialFilter.address = address as string;
        setSearchText(address as string);
      }

      // Строковые параметры
      if (type) initialFilter.type = type as "sale" | "rent";
      if (country) initialFilter.country = country as string;
      if (city) initialFilter.city = city as string;
      if (propertyType) initialFilter.propertyType = propertyType as string;

      // Числовые параметры
      if (minPrice) initialFilter.minPrice = Number(minPrice);
      if (maxPrice) initialFilter.maxPrice = Number(maxPrice);
      if (minArea) initialFilter.minArea = Number(minArea);
      if (maxArea) initialFilter.maxArea = Number(maxArea);
      if (floor) initialFilter.floor = Number(floor);

      // Булевы параметры для парковки
      if (parking === "open") initialFilter.open = true;
      if (parking === "closed") initialFilter.closed = true;

      // Устанавливаем оба состояния фильтров
      setFilter(initialFilter);
      setAppliedFilter(initialFilter);

      // Загружаем отфильтрованные объявления
      const ads = filterAds(initialFilter, "try");
      const sortedAds = sortAds("price-cheap", ads);
      setFilteredAds(sortedAds);

      // Инициализация списков фильтров
      setFilterValues(getUniqueFilterValues());
    }
  }, [
    router.isReady,
    type,
    country,
    city,
    propertyType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    floor,
    parking,
    address,
  ]);

  // Фильтрация и обновление URL при изменении фильтров
  useEffect(() => {
    if (router.isReady && urlUpdatePending) {
      // 1. Фильтруем и сортируем объявления
      const ads = filterAds(appliedFilter, "try");
      setFilteredAds(sortAds(sortOption, ads));

      // 2. Формируем URL параметры
      const query: Record<string, string> = {};

      // Добавляем только значимые параметры в URL
      if (appliedFilter.type) query.type = appliedFilter.type;
      if (appliedFilter.country) query.country = appliedFilter.country;
      if (appliedFilter.city) query.city = appliedFilter.city;
      if (appliedFilter.propertyType)
        query.propertyType = appliedFilter.propertyType;

      if (appliedFilter.minPrice)
        query.minPrice = appliedFilter.minPrice.toString();
      if (appliedFilter.maxPrice)
        query.maxPrice = appliedFilter.maxPrice.toString();
      if (appliedFilter.minArea)
        query.minArea = appliedFilter.minArea.toString();
      if (appliedFilter.maxArea)
        query.maxArea = appliedFilter.maxArea.toString();
      if (appliedFilter.floor) query.floor = appliedFilter.floor.toString();

      // Параметры парковки
      if (appliedFilter.open && !appliedFilter.closed) query.parking = "open";
      if (appliedFilter.closed && !appliedFilter.open) query.parking = "closed";
      if (appliedFilter.open && appliedFilter.closed) query.parking = "both";

      if (appliedFilter.address) query.address = appliedFilter.address;

      // Обновляем URL без перезагрузки страницы
      router.replace({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });

      // После обновления URL сбрасываем флаг
      setUrlUpdatePending(false);
    }
  }, [appliedFilter, sortOption, router.isReady, urlUpdatePending]);

  // Устанавливаем флаг обновления URL при изменении фильтров или опций сортировки
  useEffect(() => {
    setUrlUpdatePending(true);
  }, [appliedFilter, sortOption]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e: FilterChangeEvent) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Если есть текст поиска, добавляем его к фильтру
    const updatedFilter = { ...filter };
    if (searchText.trim()) {
      updatedFilter.address = searchText.trim();
    } else if (updatedFilter.address) {
      // Удаляем address если поле поиска пустое
      delete updatedFilter.address;
    }

    // Удаляем свойства с пустыми строками
    Object.keys(updatedFilter).forEach((key) => {
      const k = key as keyof Filter;
      if (updatedFilter[k] === "") {
        delete updatedFilter[k];
      }
    });

    setAppliedFilter(updatedFilter);
  };

  const handleSortChange = (e: FilterChangeEvent) => {
    setSortOption(e.target.value as string);
  };

  const resetFilters = () => {
    // Сохраняем только параметр type (аренда/продажа), если он есть
    const typeParam = router.query.type ? `?type=${router.query.type}` : "";
    const langParam = lang ? (typeParam ? `&lang=${lang}` : `?lang=${lang}`) : "";
    window.location.href = `/search${typeParam}${langParam}`;
  };

  // Фильтруем города в зависимости от выбранной страны
  const filteredCities = useMemo(() => {
    if (!filter.country) return filterValues.cities;

    return filter.country === "Russia"
      ? filterValues.cities.filter((city) => city.en === "Moscow")
      : filter.country === "Turkey"
      ? filterValues.cities.filter((city) => city.en !== "Moscow")
      : filterValues.cities;
  }, [filter.country, filterValues.cities]);

  // Опции для селектов
  const cityOptions = [
    { value: "", label: t("search.filters.allCities") },
    ...filteredCities.map((city) => ({
      value: city.en,
      label: city[lang as keyof typeof city],
    })),
  ];

  const countryOptions = [
    { value: "", label: t("search.filters.allCountries") },
    ...filterValues.countries.map((country) => ({
      value: country.en,
      label: country[lang as keyof typeof country],
    })),
  ];

  const propertyTypeOptions = [
    { value: "", label: t("search.filters.any") },
    ...filterValues.propertyType.map((propertyType) => ({
      value: propertyType.en,
      label: propertyType[lang as keyof typeof propertyType],
    })),
  ];

  const FloorOptions = [
    { value: "", label: t("search.filters.any") },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4+" },
  ];

  const SortOptions = [
    { value: "price-cheap", label: t("search.sorting.cheapFirst") },
    { value: "price-expensive", label: t("search.sorting.expensiveFirst") },
    { value: "area-small", label: t("search.sorting.smallFirst") },
    { value: "area-large", label: t("search.sorting.largeFirst") },
  ];

  const filters = [
    { key: "closed", label: t("search.filters.openParking") },
    { key: "open", label: t("search.filters.closedParking") },
  ];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/search" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Property Search" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <main className={styles.main}>
        <div className={styles.filterBox}>
          <div className={styles.filter}>
            <label htmlFor="country-input">
              {t("search.filters.country")}
            </label>
            <Select
              id="country"
              inputId="country-input"
              name="country"
              value={countryOptions.find(
                (option) => option.value === (filter.country ?? "")
              )}
              onChange={(newValue) => {
                const selectedOption = newValue as SelectOption;
                handleFilterChange({
                  target: {
                    name: "country",
                    value: selectedOption?.value || "",
                  },
                });
              }}
              options={countryOptions}
              isSearchable
              classNamePrefix="react-select"
            />
          </div>

          <div className={styles.filter}>
            <label htmlFor="city-input">{t("search.filters.city")}</label>
            <Select
              id="city"
              inputId="city-input"
              name="city"
              value={cityOptions.find(
                (option) => option.value === (filter.city ?? "")
              )}
              onChange={(newValue) => {
                const selectedOption = newValue as SelectOption;
                handleFilterChange({
                  target: {
                    name: "city",
                    value: selectedOption?.value || "",
                  },
                });
              }}
              options={cityOptions}
              isSearchable
              classNamePrefix="react-select"
            />
          </div>

          <div className={styles.filter}>
            <label htmlFor="propertyType-input">
              {t("search.filters.propertyType")}
            </label>
            <Select
              inputId="propertyType-input"
              id="propertyType"
              name="propertyType"
              value={propertyTypeOptions.find(
                (option) => option.value === (filter.propertyType ?? "")
              )}
              onChange={(newValue) => {
                const selectedOption = newValue as SelectOption;
                handleFilterChange({
                  target: {
                    name: "propertyType",
                    value: selectedOption?.value || "",
                  },
                });
              }}
              options={propertyTypeOptions}
              isSearchable
              classNamePrefix="react-select"
            />
          </div>


          <div className={styles.filter}>
            <label htmlFor="floor-input">{t("search.filters.floor")}</label>
            <Select
              inputId="floor-input"
              id="floor"
              name="floor"
              value={FloorOptions.find(
                (option) =>
                  option.value === (filter.floor ? String(filter.floor) : "")
              )}
              onChange={(newValue) => {
                const selectedOption = newValue as SelectOption;
                handleFilterChange({
                  target: {
                    name: "floor",
                    value: selectedOption?.value
                      ? Number(selectedOption.value)
                      : undefined,
                  },
                });
              }}
              options={FloorOptions}
              classNamePrefix="react-select"
            />
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filter}>
              <label htmlFor="minPrice">{t("search.filters.priceFrom")}</label>
              <input
                type="text"
                id="minPrice"
                name="minPrice"
                value={filter.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange({
                    target: {
                      name: e.target.name,
                      value: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxPrice">{t("search.filters.priceTo")}</label>
              <input
                type="text"
                id="maxPrice"
                name="maxPrice"
                value={filter.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange({
                    target: {
                      name: e.target.name,
                      value: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filter}>
              <label htmlFor="minArea">{t("search.filters.areaFrom")}</label>
              <input
                type="text"
                id="minArea"
                name="minArea"
                value={filter.minArea || ""}
                onChange={(e) =>
                  handleFilterChange({
                    target: {
                      name: e.target.name,
                      value: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxArea">{t("search.filters.areaTo")}</label>
              <input
                type="text"
                id="maxArea"
                name="maxArea"
                value={filter.maxArea || ""}
                onChange={(e) =>
                  handleFilterChange({
                    target: {
                      name: e.target.name,
                      value: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <p>{t("search.filters.parking")}</p>
            <div>
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  className={`${styles.filterButton} ${
                    filter[key as keyof typeof filter] ? styles.active : ""
                  }`}
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof filter],
                    }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.applyButton} onClick={applyFilters}>
              {t("search.filters.apply")}
            </button>
          </div>
        </div>

        <div className={styles.searchBlock}>
          <div className={styles.controlPanel}>
            <div className={styles.searchPanel}>
              <input
                id="search"
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder={t("search.filters.searchPlaceholder")}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              />
              <button className={styles.searchButton} onClick={applyFilters}>
                {t("search.filters.searchButton")}
              </button>
            </div>

            <div className={styles.addPanel}>
              {Object.keys(appliedFilter).length > 1 && (
                <button onClick={resetFilters} className={styles.resetButton}>
                  {t("search.filters.reset")}
                </button>
              )}

              <Select
                className={styles.sortButton}
                id="sort"
                name="sort"
                value={SortOptions.find(
                  (option) => option.value === sortOption
                )}
                onChange={(newValue) => {
                  const selectedOption = newValue as SelectOption;
                  handleSortChange({
                    target: {
                      name: "sort",
                      value: selectedOption?.value || "price-cheap",
                    },
                  });
                }}
                options={SortOptions}
                isSearchable={false}
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <PaginatedAds itemsPerPage={8} ads={filteredAds} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: "Поиск недвижимости - Караяка | Недвижимость в Турции и России",
      description: "Поиск и подбор недвижимости в Турции и России. Удобные фильтры, большая база предложений, актуальные цены.",
      keywords: "поиск недвижимости, аренда, покупка, недвижимость в Турции, недвижимость в России, квартиры, дома"
    },
    en: {
      title: "Property Search - Karayaka | Real Estate in Turkey and Russia",
      description: "Search and find real estate in Turkey and Russia. Convenient filters, large database of offers, current prices.",
      keywords: "property search, rent, buy, real estate in Turkey, real estate in Russia, apartments, houses"
    }
  };

  return {
    props: {
      metaTags
    }
  };
}