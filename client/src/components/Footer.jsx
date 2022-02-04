import React from "react";

const Footer = () => (
  <div>
    <p className="footer">
      <a href="https://www.linkedin.com/in/andrewxlam" target="_blank">
        Andrew Lam
      </a>{" "}
      —{" "}
      <a href="https://github.com/awhlam/tv-graph" target="_blank">
        Source
      </a>{" "}
      — This product uses the{" "}
      <a
        href="https://developers.themoviedb.org/3/getting-started/introduction"
        target="_blank"
      >
        TMDB API
      </a>{" "}
      but is not endorsed or certified by TMDB.
    </p>
  </div>
);

export default Footer;
