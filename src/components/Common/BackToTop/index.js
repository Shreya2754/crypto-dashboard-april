import React, { useEffect, useRef } from 'react';
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import "./styles.css";

function BackToTop() {
  const buttonRef = useRef(null);

  const scrollFunction = () => {
    if (!buttonRef.current) return;

    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      buttonRef.current.style.display = "flex";
    } else {
      buttonRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    const handleScroll = () => scrollFunction();

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    // Call scrollFunction once on mount to set correct visibility
    scrollFunction();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={buttonRef}
      className='back-top-top-btn'
      id='myBtn'
      onClick={topFunction}
      style={{ display: "none" }} // Start hidden
    >
      <ArrowUpwardRoundedIcon style={{ color: "var(--blue)" }} />
    </div>
  );
}

export default BackToTop;
