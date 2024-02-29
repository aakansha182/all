import React from "react";
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { ImHeadphones } from "react-icons/im";

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <IoBookSharp className="icon_header" /> EXPLORE
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <div className="sidebar-list">
        <a href="/admin" className="sidebar-list-item">
          <BsGrid1X2Fill className="icon" /> Dashboard
        </a>

        <a href="/admin/books" className="sidebar-list-item">
          <FaBook className="icon" /> Books
        </a>

        <a href="/admin/audiobooks" className="sidebar-list-item">
          <ImHeadphones className="icon" /> Audiobooks
        </a>

        <a href="/admin/genre" className="sidebar-list-item">
          <BsFillGrid3X3GapFill className="icon" /> Genre
        </a>

        <a href="/admin/customer" className="sidebar-list-item">
          <BsPeopleFill className="icon" /> Customers
        </a>

        <a href="/admin/inventory" className="sidebar-list-item">
          <BsListCheck className="icon" /> Inventory
        </a>

        <a href="/admin" className="sidebar-list-item">
          <BsMenuButtonWideFill className="icon" /> Reports
        </a>

        <a href="/admin" className="sidebar-list-item">
          <BsFillGearFill className="icon" /> Setting
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
