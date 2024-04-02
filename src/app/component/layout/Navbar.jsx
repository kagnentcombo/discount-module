"use client";
import React, { useEffect, useState } from "react";
import ListIcon from "../icons/list";
import { Button } from "react-bootstrap";
import CloseIcon from "../icons/close";

const Navbar = ({ themeColor, bgColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [womenIsOpen, setWomenIsOpen] = useState(true);
  const [menIsOpen, setMenIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleWomen = () => {
    setIsOpen(true);
    setWomenIsOpen(true);
    setMenIsOpen(false);
  };

  const toggleMen = () => {
    setIsOpen(true);
    setMenIsOpen(true);
    setWomenIsOpen(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top hover-overlay ${bgColor}`}
    >
      <div className="container-fluid">
        <div className="d-flex ">
          <div>
            <Button
              onClick={toggleNavbar}
              style={{
                padding: "0",
                border: "none",
                marginRight: "30px",
              }}
              variant="link"
            >
              {isOpen ? (
                <CloseIcon color={themeColor} />
              ) : (
                <ListIcon color={themeColor} />
              )}
            </Button>
          </div>

          <div>
            <a
              className="navbar-brand"
              href="/"
              style={{
                fontSize: "7vw",
                color: themeColor,
              }}
            >
              Mercy
            </a>
            <div className="d-flex flex-row">
              <ul className="">
                <li className="list-group-item  ">
                  <a
                    className="nav-link"
                    href="#"
                    style={{
                      fontSize: "14px",
                      color: themeColor,
                      fontWeight: isOpen && womenIsOpen ? "bold" : "normal",
                    }}
                    onClick={toggleWomen}
                  >
                    หญิง
                  </a>
                </li>
              </ul>
              <ul className=" ">
                <li className="list-group-item  ">
                  <a
                    className="nav-link"
                    href="#"
                    style={{
                      fontSize: "14px",
                      color: themeColor,
                      fontWeight: menIsOpen ? "bold" : "normal",
                    }}
                    onClick={toggleMen}
                  >
                    ชาย
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <ul
            className="navbar-nav mr-auto d-flex flex-row gap-4 pb-5 "
            style={{ fontSize: "8px", color: themeColor }}
          >
            <li className="nav-item ">
              <a
                className="nav-link d-none d-sm-block"
                href="#"
                style={{ fontSize: "14px", color: themeColor }}
              >
                เข้าสู่ระบบ
              </a>
            </li>
            <li className="nav-item d-none d-sm-block">
              <a
                className="nav-link"
                href="#"
                style={{ fontSize: "14px", color: themeColor }}
              >
                ความช่วยเหลือ
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/cart"
                style={{ fontSize: "14px", color: themeColor }}
              >
                ตะกร้า
              </a>
            </li>
          </ul>
        </div>
        {(isOpen || isSmallScreen) && (
          <div
            className=" position-absolute top-100 start-1 "
            id="navbarSupportedContent"
          >
            {womenIsOpen && (
              <ul
                className="d-flex flex-column gap-2"
                style={{ width: "200px", color: themeColor }}
              >
                <li className="list-group-item ">
                  <a
                    className="nav-link"
                    href="/women/dress"
                    style={{ fontSize: "14px" }}
                  >
                    เดรส
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/women/skirt"
                    style={{ fontSize: "14px" }}
                  >
                    กระโปรง
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/women/warmSuit"
                    style={{ fontSize: "14px" }}
                  >
                    ชุดวอร์ม
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/women/shirt"
                    style={{ fontSize: "14px" }}
                  >
                    เสื้อเชิ้ต
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/women/jeans"
                    style={{ fontSize: "14px" }}
                  >
                    ยีนส์
                  </a>
                </li>
              </ul>
            )}
            {menIsOpen && (
              <ul
                className="d-flex flex-column gap-2"
                style={{ width: "200px", color: themeColor }}
              >
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/men/shirt"
                    style={{ fontSize: "14px" }}
                  >
                    เสื้อเชิ้ต
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/men/pants"
                    style={{ fontSize: "14px" }}
                  >
                    กางเกง
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/men/jeans"
                    style={{ fontSize: "14px" }}
                  >
                    ยีนส์
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/men/warmSuit"
                    style={{ fontSize: "14px" }}
                  >
                    ชุดวอร์ม
                  </a>
                </li>
                <li className="list-group-item">
                  <a
                    className="nav-link"
                    href="/men/shorts"
                    style={{ fontSize: "14px" }}
                  >
                    กางเกงขาสั้น
                  </a>
                </li>
              </ul>
            )}

            <div>
              <ul
                className="navbar-nav mr-auto d-flex flex-row gap-4 pb-5 d-sm-none d-block"
                style={{ fontSize: "8px", color: themeColor }}
              >
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="#"
                    style={{ fontSize: "14px", color: themeColor }}
                  >
                    เข้าสู่ระบบ
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    style={{ fontSize: "14px", color: themeColor }}
                  >
                    ความช่วยเหลือ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
