import React, { useState } from "react";
import { Product } from "../types/Product";
import "./ProductList.css";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h4>Product Listing</h4>
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="product-list-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              className="product-image"
              src="https://placehold.co/600x400"
              alt={`${product.name}`}
            />
            <div className="product-brand">{product.brand}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-sku">
              SKU: {product.sku}
              <span>
                {product.multipleSizesAvailable && (
                  <div className="product-multiple-sizes">
                    Multiple Sizes Available
                  </div>
                )}
              </span>
            </div>

            <div>From</div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <button className="view-product-button">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
