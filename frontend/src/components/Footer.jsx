import React from "react";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container footer-container">
        <div>
          <div className="footer-text">Developed by Ashish Pandey</div>
          <p></p>
          <div className="footer-text">
            Using the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://anilist.gitbook.io/anilist-apiv2-docs/"
            >
              AniList APIv2
            </a>
          </div>
        </div>
        <div className="footer-icons">
          <BsLinkedin className="icon-padding" size={60} color="white" />
          <BsGithub className="icon-padding" size={60} color="white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
