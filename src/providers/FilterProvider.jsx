"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const FilterContext = createContext();

export function useFilters() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };
  console.log(filters);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
