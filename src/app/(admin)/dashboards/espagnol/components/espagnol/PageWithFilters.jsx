"use client";
import { useSearchParams } from 'next/navigation';
import FilterCard from './FilterCard';
import Table from './Table';

const PageWithFilters = () => {
  

  return (
    <>
      <FilterCard />
      
      <Table  />
    </>
  );
};

export default PageWithFilters;