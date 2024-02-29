import React, { useState } from "react";
import axios from "axios";

const TestFile = () => {
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.set("email", email);
    data.set("profileImg", img);

    axios.post("http://localhost:3001/upload", data).then((res) => {
      alert(res.data.message);
      // alert("done");
    });
  };
  return (
    <>
      <div className="w-full h-[60vh] flex items-center justify-center">
        <form
          action=""
          onSubmit={handleUpload}
          className="w-[50%] h-[50%] border flex flex-col items-center justify-center gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={(e) => setEmail((prev) => ({...prev e.target.value}))}
            required
            className="w-[50%] text-blue-500"
          />
          <input
            type="file"
            name="img"
            // value={img}
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
          <button type="submit" className="w-[50%] bg-black active:scale-75">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default TestFile;
