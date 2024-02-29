import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading";
import { Link } from "react-router-dom";

const YourBooks = () => {
  const [bookdata, setBookdata] = useState();
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

export default YourBooks;

export const BooksCard = (props) => {
  const { i } = props;
  return (
    <>
      <div className=" div  w-auto h-auto flex flex-col gap-5 shadow-xl text-black scale-90 hover:scale-95 hover:bg-orange-500 ease-in-out duration-300 rounded-xl active:scale-90 overflow-hidden">
        {/* <div className="w-full h-[85%] bg-[#F8F8F8] overflow-hidden"> */}
        <Link
          to={`/admin/books/book-detail/${i?.bkname ?? "name"}`}
          target="_parent"
          // className="h-full flex items-center"
        >
          <img
            src={i?.bkimage ?? "img"}
            alt=""
            className="h-[220px] w-[150px] object-cover rounded-md"
          />
        </Link>
        {/* </div> */}
        <div>
          <h3 className="font-semibold dark:text-white">
            {i.bkname ?? "name"}
          </h3>
          <p className="text-sm text-stone-700 ">{i.authname}</p>
        </div>
      </div>
    </>
  );
};
