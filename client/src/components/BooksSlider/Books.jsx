import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading";
import { Document, Page } from "react-pdf";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
// import "../cardCss/booksCard.css"

const Books = () => {
  const [bookdata, setBookdata] = useState();
  const [bookNo, setBookNo] = useState("");

  // const [bk, setBk] = useState();
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const fetchbooks = async () => {
    const bookColl = "books";

    try {
      axios
        .post("http://localhost:3001/get-dbcollections", bookColl)
        .then((res) => {
          const databook = res.data.data;
          // alert(res.data.message);
          setBookdata(databook);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!bookdata) {
      fetchbooks();
    }
  });
  console.log(bookdata);

  return (
    <div className="container">
      <div className="text-center mb-10 max-w-[600px] mx-auto">
        <h1 className="text-3xl font-bold">All Books</h1>
      </div>
      {bookdata == undefined && <Loading />}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 ">
        {bookdata != undefined &&
          bookdata.map((i) => (
            <div key={i?.bkname} className="div space-y-3">
              <BooksCard i={i} />
            </div>
          ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
        {bookdata && bookdata.length}
      </div>
    </div>
  );
};

export default Books;

export const BooksCard = (props) => {
  const { i } = props;
  return (
    <>
      <div className=" div  w-auto h-auto flex flex-col gap-5 shadow-xl text-black scale-90 hover:scale-95 hover:bg-orange-500 ease-in-out duration-300 rounded-xl active:scale-90 overflow-hidden">
        {/* <div className="w-full h-[85%] bg-[#F8F8F8] overflow-hidden"> */}
        <Link
          to={`/admin/books/book-detail/${i?.bkName ?? "name"}`}
          target="_parent"
          // className="h-full flex items-center"
        >
          <img
            src={i?.bkImagePath ?? "img"}
            alt=""
            className="h-[220px] w-[150px] object-cover rounded-md"
          />
        </Link>
        {/* </div> */}
        <div>
          <h3 className="font-semibold dark:text-white">
            {i.bkName ?? "name"}
          </h3>
          <p className="text-sm text-stone-700 ">{i.authName}</p>
        </div>
      </div>
    </>
  );
};
