import React, { useState } from "react";
import { FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import LogoLight from "../../assets/website/logo.png";
import LogoDark from "../../assets/website/logoDark.png";

const FooterLinks = [
  {
    id: 1,
    title: "About",
    link: "/#about",
  },
  {
    id: 2,
    title: "Contact",
    link: "/#contact",
  },
];
const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-neutral-800">
      <section className="ontainer">
        <div className="grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              {/* <img src={footerLogo} alt="Logo" className="max-w-[150px]" /> */}
              <img
                src={LogoDark}
                alt="Logo"
                className="logo-dark hidden dark:flex max-w-[150px]"
              />
              <img
                src={LogoLight}
                alt="Logo"
                className="logo-light flex dark:hidden max-w-[150px]"
              />
            </h1>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Mumbai</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+91 8097221590</p>
            </div>
          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {FooterLinks.map((link) => (
                    <li
                      key={link.id}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500"
                    >
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default Footer;
