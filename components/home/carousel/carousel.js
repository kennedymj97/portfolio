import React, { useState, useEffect } from "react";
import Card from "./projectCard/card";
import NavDot from "./navDot/navDot";

const carousel = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexTransitionFactor, setIndexTransitionFactor] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    process.browser ? window.innerWidth : undefined
  );

  let cards;
  let navDots = [];
  let responsiveCarousel;

  useEffect(() => {
    const logWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const getCardWidth = () => {
      if (process.browser) {
        return document.querySelector(".card").clientWidth + 16;
      }
    };

    if (process.browser) {
      window.addEventListener("resize", logWindowWidth);
      setTranslateValue(getCardWidth() * indexTransitionFactor);

      return () => window.removeEventListener("resize", logWindowWidth);
    }
  });

  const projects = props.projects;

  // console.log(projects)

  let arrowRightStyles =
    (windowWidth > 900 && currentIndex === projects.length - 2) ||
    currentIndex === projects.length - 1
      ? { visibility: "hidden", opacity: "0" }
      : { visibility: "visible", opacity: "1" };

  const nextCardHandler = () => {
    if (
      (windowWidth > 900 && currentIndex === projects.length - 2) ||
      currentIndex === projects.length - 1
    ) {
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setIndexTransitionFactor(indexTransitionFactor - 1);
  };

  const prevCardHandler = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
    setIndexTransitionFactor(indexTransitionFactor + 1);
  };

  const goToIndexHandler = index => {
    setCurrentIndex(index);
    setIndexTransitionFactor(-index);
  };

  if (windowWidth !== undefined) {
    if (windowWidth < 900) {
      cards = projects.map((ele, idx) => (
        <Card
          key={ele.id}
          active={idx === currentIndex}
          title={ele.title}
          summary={ele.summary}
          translate={translateValue}
          name={ele.name}
        />
      ));

      if (currentIndex === projects.legnth - 1) {
        arrowRightVisibilty = "hidden";
        arrowRightOpacity = "0";
      }

      if (projects.length > 2) {
        for (let i = 0; i < projects.length; i++) {
          navDots = [
            ...navDots,
            <NavDot
              key={i}
              active={i === currentIndex}
              clicked={() => goToIndexHandler(i)}
            />
          ];
        }
      }

      responsiveCarousel = (
        <React.Fragment>
          <div className="slider">{cards}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "15px 0"
            }}
          >
            <i
              className="arrow arrow-left fas fa-chevron-circle-left"
              onClick={prevCardHandler}
            />
            <div className="navDots">{navDots}</div>
            <i
              className="arrow arrow-right fas fa-chevron-circle-right"
              onClick={nextCardHandler}
            />
          </div>
        </React.Fragment>
      );
    } else {
      cards = projects.map((ele, idx) => (
        <Card
          key={ele.id}
          active={idx === currentIndex || idx === currentIndex + 1}
          title={ele.title}
          summary={ele.summary}
          translate={translateValue}
          name={ele.name}
        />
      ));

      if (projects.length > 2) {
        for (let i = 0; i < projects.length - 1; i++) {
          navDots = [
            ...navDots,
            <NavDot
              key={i}
              active={i === currentIndex}
              clicked={() => goToIndexHandler(i)}
            />
          ];
        }
      }

      responsiveCarousel = (
        <React.Fragment>
          <div className="slider">
            <i
              className="arrow arrow-left fas fa-chevron-circle-left"
              onClick={prevCardHandler}
            />
            {cards}
            <i
              className="arrow arrow-right fas fa-chevron-circle-right"
              onClick={nextCardHandler}
            />
          </div>
          <div className="navDots">{navDots}</div>
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="carousel">{responsiveCarousel}</div>
      <style jsx>{`
        .carousel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          position: relative;
          width: 100%;
        }

        :global(.slider) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          width: 100%;
          padding: 13px;
          padding-left: 12.5%;
          min-height: 426px;
          position: relative;
        }

        :global(.navDots) {
          display: flex;
          margin: 20px;
        }

        :global(.arrow) {
          z-index: 100;
          font-size: 40px;
          color: #0076ff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          transition: opacity 0.3s ease-in, visibility 0.3s;
          cursor: pointer;
          position: absolute;
        }

        :global(.arrow-left) {
          left: 7%;
          visibility: ${currentIndex === 0 ? "hidden" : "visible"};
          opacity: ${currentIndex === 0 ? "0" : "1"};
        }

        :global(.arrow-right) {
          right: 7%;
          visibility: ${arrowRightStyles.visibility};
          opacity: ${arrowRightStyles.opacity};
        }

        @media (max-width: 900px) {
          .slider {
            padding-left: 14.2%;
          }

          :global(.arrow) {
            position: static;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default carousel;
