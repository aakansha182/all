import React, { useEffect, useState } from "react";
import axios from "axios";
import Vector from "../../assets/website/yellow-orange.png";

const Hero = ({ handleOrderPopup }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch 3 random books from your backend API
    axios.get("http://localhost:3001/get-random-books")
      .then(response => {
        if (response.data && response.data.data) {
          setBooks(response.data.data);
          // Optionally select the first book to be displayed
          setSelectedBook(response.data.data[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  const handleReadNow = () => {
    if (selectedBook && selectedBook.bkcon) {
      window.open(selectedBook.bkcon, "_blank");
    } else {
      console.error("Book content PDF not available");
    }
  };


  return (
    <>
      <div className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-black dark:text-white duration-200" style={bgImage}>
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div data-aos-once="true" className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              {selectedBook && (
                <div key={selectedBook._id}>
                  <h1 data-aos="zoom-out" data-aos-duration="500" data-aos-once="true" className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    {selectedBook.bkname}
                    <p className="bg-clip-text text-transparent bg-gradient-to-b from-primary text-right text-sm to-secondary">
                      by {selectedBook.authname}
                    </p>{" "}
                  </h1>
                  <p data-aos="slide-up" data-aos-duration="500" data-aos-delay="100" className="text-sm ">
                    {selectedBook.desp}
                  </p>
                  <button onClick={handleReadNow} className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                    Read Now
                  </button>
                </div>
              )}
            </div>
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                {selectedBook && (
                  <img data-aos="zoom-in" data-aos-once="true" src={selectedBook.bkimage} alt={selectedBook.bkname} className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto" />
                )}
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 cursor-pointer justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-white rounded-full">
                {books.map((book) => (
                  <img
                    key={book._id}
                    data-aos="zoom-in"
                    data-aos-once="true"
                    src={book.bkimage}
                    onClick={() => setSelectedBook(book)}
                    alt={book.bkname}
                    className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
