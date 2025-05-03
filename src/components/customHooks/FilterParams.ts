import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle null values by providing empty string defaults
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  // Improved number handling with proper validation
  const maxPriceParam = searchParams.get("maxPrice");
  const parsedMaxPrice = maxPriceParam ? parseInt(maxPriceParam, 10) : undefined;
  const maxPrice = Number.isInteger(parsedMaxPrice) ? parsedMaxPrice : undefined;

  const handleFilter = useCallback((filters: {
    search?: string;
    category?: string;
    maxPrice?: number | string;
  }) => {
    const newSearchParams = new URLSearchParams(searchParams);

    const updateParam = (key: string, value?: string | number) => {
      if (value === undefined || value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    };

    // Handle search parameter with type safety
    if (filters.search !== undefined) {
      updateParam("search", filters.search);
    }

    // Handle category parameter
    if (filters.category !== undefined) {
      updateParam("category", filters.category);
    }

    // Handle maxPrice with numeric validation
    if (filters.maxPrice !== undefined) {
      const numericValue = typeof filters.maxPrice === "string" 
        ? parseInt(filters.maxPrice, 10)
        : filters.maxPrice;

      updateParam("maxPrice", Number.isInteger(numericValue) ? numericValue : "");
    }

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  return {
    search,       // Always returns string (never null)
    category,     // Always returns string (never null)
    maxPrice,     // Returns number or undefined
    handleFilter,
  };
};