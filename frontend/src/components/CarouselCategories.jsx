import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';  // import Link for navigation
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const categories = [
   { title: "Rakhi", img: "rakhi.jpg",  badge: "New" },
  //  { title: "Diwali", img: "diwali.jpg" },
      // { title: "Birthday", img: "bday.jpg" },
    { title: "Crochet", img: "crochet.jpg" },

      { title: "Resin", img: "resin.jpg" },
      //  { title: "phone-cases", img: "phonecase.jpg" },
        { title: "Decor Essentials", img: "decor.jpg" },
    { title: "Bouquets", img: "bouquet.jpg" },
  { title: "Paintings", img: "polaroid.jpg" },
  { title: "Bookmarks", img: "bookmark.jpg" },
  { title: "Customised-Gifts", img: "hampers.jpg" },
  { title: "Keychains", img: "Keychain.jpg" },
    { title: "Frames", img: "frames.jpg" },
  { title: "Fabrics", img: "fabric.jpg" },
  
  
  // add more if needed
];

// Helper function to create URL-friendly category slug
const toSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10
               bg-[#661638] text-white w-5 h-5 rounded-full
               flex items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10
               bg-[#661638] text-white w-5 h-5 rounded-full
               flex items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    ❮
  </div>
);

const CarouselCategories = () => {
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,       // show 4 circles at once on desktop
  //   slidesToScroll: 1,
  //   responsive: [
  //     { breakpoint: 1024, settings: { slidesToShow: 3 } },
  //     { breakpoint: 600, settings: { slidesToShow: 2 } },
  //     { breakpoint: 480, settings: { slidesToShow: 1 } },
  //   ],
  // };

const settings = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 2.2,
  slidesToScroll: 1,

  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2.2 } },
    { breakpoint: 480, settings: { slidesToShow: 1.4 } },
  ],
};

  return (
    <div className="px-4 md:px-8 mt-16 z-20 relative">
      <h2
        className="text-2xl sm:text-3xl text-center text-[#4B001F] font-semibold mb-10"
       style={{ fontFamily: "'Cinzel Decorative', cursive" }}
      >
        Explore by Category
      </h2>
      <Slider {...settings}>
        {categories.map((cat, i) => (
          <div key={i} className="!flex !flex-col !items-center !justify-center text-center px-2"
          style={{ minWidth: "150px" }}   // ADD THIS
          >

            <Link to={`/category/${encodeURIComponent(cat.title)}`} className="group relative inline-block">
{cat.badge && (
  <span
    className="
      absolute top-1 right-1 z-20
      bg-[#661638] text-white
      text-[9px] sm:text-[10px]
      px-2 py-1 rounded-full
      font-bold shadow-md
    "
  >
    {cat.badge}
  </span>
)}
              <img
                src={cat.img}
                alt={cat.title}
                // className="rounded-full w-28 h-28 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                className="rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover shadow-lg 
                transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              />
              {/* <p
                className="mt-5 text-[#4B001F] font-semibold text-lg text-center"
              style={{ fontFamily: "'Cinzel Decorative', cursive" }}
              >
                {cat.title}
              </p> */}
              <p
              className="mt-3 text-[#4B001F] font-semibold text-sm sm:text-lg text-center"
              style={{ fontFamily: "'Cinzel Decorative', cursive" }}
               >
  {cat.title}
</p>

            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselCategories;



