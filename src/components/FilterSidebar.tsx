import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// Define the types for the filters and the products
interface FilterOption {
  name: string;
  count: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

interface Product {
  brand: string;
  viscosity: string;
  size: string;
}

interface FilterSidebarProps {
  selectedBrand: string; 
  onBrandSelect: (brand: string) => void; 
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedBrand,
  onBrandSelect,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    Brand: true,
    Viscosity: true,
    Size: true,
  });

  const products: Product[] = [
    { brand: "Mobile", viscosity: "0W-20", size: "1 Quart" },
    { brand: "Mobile", viscosity: "5W-30", size: "5 Quarts" },
    { brand: "Old World", viscosity: "10W-30", size: "1 Gallon" },
    { brand: "Peak", viscosity: "5W-30", size: "Bulk 1 Drum" },
    { brand: "Mobile", viscosity: "0W-30", size: "1 Quart" },
    { brand: "Mobile", viscosity: "5W-20", size: "5 Quarts" },
    { brand: "Old World", viscosity: "10W-30", size: "1 Gallon" },
    { brand: "Tablet", viscosity: "5W-30", size: "Bulk 1 Drum" },
  ];

  const calculateCounts = (
    title: string,
    field: keyof Product
  ): FilterOption[] => {
    if (title === "Brand") {
      const brandCounts: { [key: string]: number } = {};
      products.forEach((product) => {
        brandCounts[product[field]] = (brandCounts[product[field]] || 0) + 1;
      });
      return Object.entries(brandCounts).map(([name, count]) => ({
        name,
        count,
      }));
    }

    if (title === "Viscosity") {
      return [
        { name: "0W-20", count: 10 },
        { name: "0W-30", count: 5 },
        { name: "5W-20", count: 5 },
        { name: "5W-30", count: 25 },
        { name: "10W-30", count: 7 },
        { name: "10W-40", count: 4 },
      ];
    }
    if (title === "Size") {
      return [
        { name: "1 Quart", count: 50 },
        { name: "5 Quarts", count: 25 },
        { name: "1 Gallon", count: 75 },
        { name: "Bulk 1 Drum", count: 7 },
        { name: "Bulk 1 Tote", count: 3 },
        { name: "Half-Quart", count: 4 },
      ];
    }
    return [];
  };

  const filters: FilterGroup[] = [
    {
      title: "Brand",
      options: calculateCounts("Brand", "brand"),
    },
    {
      title: "Viscosity",
      options: calculateCounts("Viscosity", "viscosity"),
    },
    {
      title: "Size",
      options: calculateCounts("Size", "size"),
    },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="filter-sidebar">
      {filters.map((group) => (
        <div key={group.title} className="filter-group">
          <div
            className="filter-header d-flex justify-content-between align-items-center"
            onClick={() => toggleSection(group.title)}
          >
            <h5 className="m-0">{group.title}</h5>
            {expandedSections[group.title] ? (
              <FaMinus className="cursor-pointer" />
            ) : (
              <FaPlus className="cursor-pointer" />
            )}
          </div>
          {expandedSections[group.title] && (
            <div
              className={`filter-options mt-2 ${
                group.title === "Brand" ? "brand-scrollable" : ""
              }`}
            >
              {group.options.map((option) => (
                <div
                  key={option.name}
                  className={`filter-option ${
                    selectedBrand === option.name ? "active" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    color: selectedBrand === option.name ? "blue" : "black",
                  }}
                  onClick={() =>
                    onBrandSelect(
                      selectedBrand === option.name ? "" : option.name
                    )
                  }
                >
                  <span>
                    {option.name}
                    <span className="p_count">({option.count})</span>
                  </span>
                  <hr className="option-divider" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
