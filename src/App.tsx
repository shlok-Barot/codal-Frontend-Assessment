import React, { useState } from "react";
import mockData from "./data/mockData.json";
import { Product } from "./types/Product";
import ProductList from "./components/ProductList";
import FilterSidebar from "./components/FilterSidebar";
import PaginationComponent from "./components/Pagination";

const App: React.FC = () => {
  const products: Product[] = mockData;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(""); 
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) =>
    selectedBrand ? product.brand === selectedBrand : true
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar
            selectedBrand={selectedBrand}
            onBrandSelect={setSelectedBrand}
          />
        </div>
        <div className="col-md-9">
          <ProductList products={displayedProducts} />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
