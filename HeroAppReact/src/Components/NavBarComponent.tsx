import React, { useEffect, useState } from "react";
import "../Styles/NavBarComponentStyles.css";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    const handleMenuChange = () => {
      const menuButtonChecked = (
        document.getElementById("menuButton") as HTMLInputElement
      )?.checked;
      setDropped(menuButtonChecked);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropped && (event.target as Element).id !== "menuButton") {
        setDropped(false);
        (document.getElementById("menuButton") as HTMLInputElement).checked =
          false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    document
      .getElementById("menuButton")
      ?.addEventListener("change", handleMenuChange);
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document
        .getElementById("menuButton")
        ?.removeEventListener("change", handleMenuChange);
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [dropped]);

  return (
    <div>
      <div className={`fixed-nav-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo" onClick={() => navigate("/")}>
          <span>EPIC</span>ENCLAVE
        </div>
        <input type="checkbox" id="menuButton" />
        <label htmlFor="menuButton" className="menu-button-label">
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
        </label>
      </div>
      <div
        className={`the-bass ${scrolled ? "scrolled" : ""} ${
          dropped ? "dropped" : ""
        }`}
      >
        <div
          className="rela-block drop-down-container"
          onClick={() => navigate("/")}
        >
          <div className="drop-down-item">
            <span>Carousel</span>
          </div>
        </div>
        <div
          className="rela-block drop-down-container"
          onClick={() => navigate("/list")}
        >
          <div className="drop-down-item">
            <span>Lista</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
