import React from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiSpellBook } from "react-icons/gi";
import { ImUserTie } from "react-icons/im";
import { FaBookReader } from "react-icons/fa";
import { BsMenuButtonWide } from "react-icons/bs";

const Inventory = () => {
  return (
    <main className="main-inv w-full h-auto overflow-hidden">
      <div className="inven">
        <a href="/admin/addbook" className="inv-list">
          <div className="invcar">
            <div className="invcard-inner">
              <h3>Add new a Book</h3>
              <GiSpellBook className="invicon" />
            </div>
          </div>
        </a>
        <a href="/admin/addaudio" className="inv-list">
          <div className="invcar">
            <div className="invcard-inner">
              <h3>Add new a Audiobook</h3>
              <FaHeadphonesSimple className="invicon" />
            </div>
          </div>
        </a>
        <a href="/admin/addgenre" className="inv-list">
          <div className="invcar">
            <div className="invcard-inner">
              <h3>Add new Genre</h3>
              <BsMenuButtonWide className="invicon" />
            </div>
          </div>
        </a>
        <a href="/admin/adduser" className="inv-list">
          <div className="invcar">
            <div className="invcard-inner">
              <h3>Add new User</h3>
              <FaBookReader className="invicon" />
            </div>
          </div>
        </a>
        <a href="/admin/addpreuser" className="inv-list">
          <div className="invcar">
            <div className="invcard-inner">
              <h3>Add new Premium User</h3>
              <ImUserTie className="invicon" />
            </div>
          </div>
        </a>
      </div>
    </main>
  );
};

export default Inventory;
