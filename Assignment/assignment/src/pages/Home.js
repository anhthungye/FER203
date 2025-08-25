import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products, loading, error } = useProducts();
  return (
    <div>
      <HeroSlider />
      <h2 className="home text-center">Featured Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
};

export default Home;