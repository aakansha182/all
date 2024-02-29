import React from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Hero from "./Hero/Hero.jsx";
import Services from "./Services/Services.jsx";
import Banner from "./Banner/Banner.jsx";
import Books from "./BooksSlider/Books.jsx";
import AudiobookSlider from "./AudiobookSlider.jsx";

// import UserProfile from "./Userprofile/Userprofile.jsx"
// import AllBooks from "./AllBooks/AllBooks.jsx";

//mport AppStore from "./components/AppStore/AppStore.jsx";
//import Testimonial from "./components/Testimonial/Testimonial.jsx";

const Home = ({ handleOrderPopup }) => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="">
        <Hero handleOrderPopup={handleOrderPopup} />
        <Services handleOrderPopup={handleOrderPopup} />
        <Banner />
        {/* <CoverBanner /> */}
        {/* <PdfReader /> */}
        <Books />
        <AudiobookSlider />
        {/* <UserProfile/> */}
        {/* <AllBooks /> */}
      </div>
    </>
  );
};

export default Home;
