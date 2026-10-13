import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';  // import Link for navigation
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const categories = [
   
  //  { title: "Diwali", img: "diwali.jpg" },
      // { title: "Birthday", img: "bday.jpg" },
      
       { title: "Diwali", img: "diwalii.jpg",  badge: "Popular"},
        { title: "Customised-Gifts", img: "hampers.jpg" },
       { title: "Keychains", img: "Keychain.jpg" },
    { title: "Decor Essentials", img: "decor.jpg" },
 { title: "Frames", img: "frames.jpg" },
 

      { title: "Resin", img: "resin.jpg" },
      //  { title: "phone-cases", img: "phonecase.jpg" },
        
    { title: "Bouquets", img: "bouquet.jpg" },
    { title: "Crochet", img: "crochet.jpg" },
    
  { title: "Paintings", img: "polaroid.jpg" },
  { title: "Rakhi", img: "rakhi.jpg" },
  { title: "Bookmarks", img: "bookmark.jpg" },
  
  
   
  { title: "Fabrics", img: "fabric.jpg" },
  
  
  // add more if needed
];

// Helper function to create URL-friendly category slug
const toSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10
               bg-[#661638] text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-xs
               flex items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10
              bg-[#661638] text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-xs
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
  slidesToShow: 3,
  slidesToScroll: 1,

  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 3 } },
  ],
};

  return (
    <div className="px-3 sm:px-4 md:px-8 mt-2 md:mt-16 z-20 relative bg-transparent">
     <h2
  className="hidden md:block text-2xl text-center text-[#4B001F] font-semibold mb-10"
  style={{ fontFamily: "'Cinzel Decorative', cursive" }}
>
  DISCOVER OUR WORLD
</h2>
      <Slider {...settings}>
        {categories.map((cat, i) => (
          <div key={i} className="!flex !flex-col !items-center !justify-center text-center px-0 md:px-2"
           // ADD THIS
          >

            <Link to={`/category/${encodeURIComponent(cat.title)}`} className="group relative inline-block">
{cat.badge && (
  <span
    className="
      absolute top-1 right-1 z-20
      bg-[#8B681B] text-[#E5C46A]
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
                className="  rounded-full w-12 h-12 sm:w-36 sm:h-36 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              />
              {/* <p
                className="mt-5 text-[#4B001F] font-semibold text-lg text-center"
              style={{ fontFamily: "'Cinzel Decorative', cursive" }}
              >
                {cat.title}
              </p> */}
              <p
              className="mt-1 md:mt-3 text-white md:text-[#4B001F] font-semibold text-[9px] sm:text-lg text-center drop-shadow-md md:drop-shadow-none"
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



