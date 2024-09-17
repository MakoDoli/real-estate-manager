"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const FilterContext = createContext();

export function useFilters() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters, isClient]);

  console.log(filters);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
