import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const Customer = () => {
  const [userdata, setUserdata] = useState();
  const [premiumUser, setPremiumUser] = useState([]);
  const [normalUser, setNormalUser] = useState([]);
  const fetchusers = async () => {
    const userColl = "users";

    try {
      axios.post("http://localhost:3001/get-dbuser", userColl).then((res) => {
        const datauser = res.data.data;
        // alert(res.data.message);
        setUserdata(datauser);
        setPremiumUser(
          datauser.filter((new_user) => new_user.role === "premium")
        );
        setNormalUser(datauser.filter((new_user) => new_user.role === "user"));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userdata) {
      fetchusers();
    }
  }, []);
  console.log(userdata);
  console.log(premiumUser);
  const premiumUserCount = premiumUser.length;
  const normalUserCount = normalUser.length + 1;

  const deluser = (us) => {
    console.log(us?._id);
    axios
      .post("http://localhost:3001/deluser", {
        _id: us?._id,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "del") {
          fetchbooks();
          // return (window.location.href = "/admin/books");
        }
      });
  };
  return (
    <div className="main-book relative overflow-hidden flex flex-col">
      <div className="bcards h-auto">
        <div className="bkcard">
          <h2>NORMAL USER</h2>
          <h3>{normalUserCount}</h3>
        </div>
        <div className="bkcard">
          <h2>PREMIUM USER</h2>
          <h3>{premiumUserCount}</h3>
        </div>
      </div>
      <h1 className="tbhead text-3xl -mb-10">User Table</h1>
      <div className="scrollDi">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Email ID</th>
                <th>Password</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {userdata == undefined && <span>undefined</span>}
              {userdata != undefined &&
                userdata.map((i) => (
                  <tr key={i._id}>
                    <td>{i.name}</td>
                    <td>{i.username}</td>
                    <td>{i.role}</td>
                    <td>{i.gender}</td>
                    <td>{i.dob}</td>
                    <td>{i.email}</td>
                    <td>{i.password}</td>
                    <td>
                      <div className=" w-full h-auto p-8 flex flex-row justify-center gap-5 text-white">
                        <FaRegEdit
                          size={30}
                          onClick={() => {
                            // setBkDetail(i);
                            // setEditOpen(!editOpen);
                          }}
                          className="active:scale-90 cursor-pointer ease-in-out duration-200"
                        />
                        <AiTwotoneDelete
                          size={30}
                          onClick={() => {
                            // setBkDetail(i);
                            deluser(i);
                          }}
                          className="active:scale-90 cursor-pointer ease-in-out duration-200"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
