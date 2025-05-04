import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, CardDescription } from './ui/card';
import { Link } from 'react-router-dom';

const InfiniteScrollComponent = ({ filteredProduct }) => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Ensure filteredProduct is always an array
    const safeProducts = Array.isArray(filteredProduct) ? filteredProduct : [];
    setItems(safeProducts);
    setDisplayedItems(safeProducts.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(safeProducts.length > itemsPerPage);
  }, [filteredProduct]);

  const fetchMoreData = () => {
    if (displayedItems.length >= items.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextItems = items.slice(
        displayedItems.length,
        displayedItems.length + itemsPerPage
      );
      
      setDisplayedItems(prev => [...prev, ...nextItems]);
      setPage(prev => prev + 1);
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={displayedItems.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      
    >
      <div className="grid md:grid-cols-4 mt-4 sm:grid-cols-1">
        {displayedItems.map((product) => (
          <Card 
          key={product.id} // Added proper key
          className="m-4 bg-green-700 hover:bg-green-800 transition-colors duration-200"
          >
          <Link to={`/shop/${product.id}`}>
            <div className="w-full h-48 flex justify-center items-center overflow-hidden cursor-pointer">
              <img
                className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
          </Link>
          <CardDescription className="text-white">
            {product.title}
          </CardDescription>
          <CardContent className="text-white">
            <p>{product.category}</p>
            <p>${product.price.toFixed(2)}</p>
          </CardContent>
          </Card>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
