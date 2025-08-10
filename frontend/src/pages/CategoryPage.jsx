import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import ArtCard from '../components/ArtCard/ArtCard';
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [arts, setArts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        // Replace with your API endpoint that filters arts by category (type/form/etc)
        const response = await axios.get(`https://theaffinity-artstore.onrender.com/api/v1/arts/get-arts-by-type/${categoryName}`);
        setArts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch arts by category/type:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArts();
  }, [categoryName]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-6 py-8 bg-[#FFF5F9] min-h-screen">
      <h2 className="text-4xl text-[#4B001F] font-semibold mb-6" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collections
      </h2>
      {arts && arts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {arts.map((art) => (
            <ArtCard key={art._id} data={art} />
          ))}
        </div>
      ) : (
        <p className="text-[#896c5dff] font-medium"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>No collections found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
