import React, { useState, useEffect } from "react";
import styles from "./carousel.module.scss";
import Icon from "Components/Icons/icon";

import {
  composeClasses,
  handleDOMEvent,
  isNotEmptyArray,
} from "libs/utils/utils";
const autoSlideDuration = 6000;
const carouselVariants = {
  fullWidth: "fullWidth",
  adjacent: "adjacent",
};

const {
  carousel,
  carouselArrowLeft,
  carouselArrowRight,
  carouselIndicator,
  carouselIndicatorActive,
  carouselIndicators,
  carouselInlineWrapper,
  carouselItem,
  carouselSlide,
  carouselSlideActive,
} = styles;

let slidesRef: any;
/**
 * CarouselArrow is a component for rendering a Carousel Arrow (left or right)
 * @param {*} props The Component's props
 * @returns {*} DOM Node
 */

interface AProps {
  onClick: any;
  position: string;
  wrapperClass: string;
  content: any;
}
// eslint-disable-next-line react/prop-types
const CarouselArrow: React.FunctionComponent<AProps> = ({
  onClick,
  position,
  wrapperClass,
}) => (
  <a
    className={composeClasses(
      position === "left" ? carouselArrowLeft : carouselArrowRight,
      wrapperClass
    )}
    href="#"
    onClick={onClick}
  >
    <Icon
      aria-label={position === "left" ? "Previous slide" : "Next slide"}
      name={position === "left" ? "left-arrow" : "right-arrow"}
    />
  </a>
);

/**
 * CarouselSlide is a component for rendering a Carousel Indicator
 * It may be passed classes (as props) to define custom styling
 * @param {*} props The Component's props
 * @returns {*} DOM Node
 */
interface BProps {
  activeIndex: number;
  customClass: string;
  customActiveClass: string;
  index: number;
  onClick: any;
  renderContent: any;
  slide: any;
}
const CarouselIndicator: React.FunctionComponent<BProps> = (props) => {
  const {
    activeIndex,
    index,
    onClick,
    customClass,
    customActiveClass,
    renderContent,
    slide,
  } = props;
  const indicatorClass = customClass ? customClass : carouselIndicator;
  const indicatorActiveClass = customActiveClass
    ? customActiveClass
    : carouselIndicatorActive;

  return (
    <li
      className={index === activeIndex ? indicatorActiveClass : indicatorClass}
      key={index}
      onClick={onClick}
    >
      {typeof renderContent === "function" ? renderContent(slide) : null}
    </li>
  );
};

/**
 * CarouselSlide is a component for rendering each item of a full-page carousel
 * @param {*} props The Component's props
 * @returns {*} DOM Node
 */

interface CProps {
  activeIndex: number;
  children: React.ReactNode;
  index: number;
  swipeLeft: any;
  swipeRight: any;
  slide: any;
}
const CarouselSlide: React.FunctionComponent<CProps> = ({
  activeIndex,
  children,
  index,
  swipeLeft,
  swipeRight,
}) => {
  const isActive = index === activeIndex;
  let initialPoint = {
    x: 0,
    y: 0,
  };

  return (
    <div
      className={isActive ? carouselSlideActive : carouselSlide}
      onTouchEnd={(e) => {
        const finalPoint = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        };
        const verticalDiff = finalPoint.y - initialPoint.y;
        const horizontalDiff =
          verticalDiff > 10 || verticalDiff < -10
            ? 0
            : finalPoint.x - initialPoint.x; // check against a y-axis threshold to avoid a vertical swipe
        if (horizontalDiff < 0) {
          typeof swipeLeft === "function" && swipeLeft(e);
        } else if (horizontalDiff > 0) {
          typeof swipeRight === "function" && swipeRight(e);
        }
      }}
      onTouchStart={(e) => {
        initialPoint = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }}
    >
      {
        // Conditional load the children only when they are active to prevent images downloading in the background without being used
        isActive && children
      }
    </div>
  );
};

/**
 * CarouselItem is a component for rendering each item of a non-full-page carousel
 * @param {*} props The Component's props
 * @returns {*} DOM Node
 */
interface DProps {
  children: React.ReactNode;
  customClass: string;
  index: number;
}
const CarouselItem: React.FunctionComponent<DProps> = ({
  children,
  customClass,
}) => (
  <div className={composeClasses(carouselItem, customClass)}>{children}</div>
);

/**
 * Carousel component
 */
interface EProps {
  customCarouselInlineWrapper: string;
  mode: any;
  itemClass: string;
  indicatorClass: string;
  indicatorActiveClass: string;
  indicatorsWrapperClass: string;
  indicatorsComposedClass: string;
  arrowClass: string;
  wrapperClass: string;

  renderIndicator: any;
  renderSlide: any;

  // Custom values to allow toggling some functionalities
  showLeftArrow: boolean;
  showRightArrow: boolean;
  showIndicators: boolean;
  slides: any;
  autoSlide: boolean;
  isAutoSlide: any;
  autoSlideDuration?: any; // ms
}
const Carousel: React.FunctionComponent<EProps> = ({
  slides,
  mode,
  isAutoSlide,
  autoSlideDuration,
  arrowClass,
  customCarouselInlineWrapper,
  itemClass,
  renderSlide,
  showIndicators,
  showLeftArrow,
  showRightArrow,
  wrapperClass,
}) => {
  const [activeIndex, setActive] = useState<number>(0);
  // const isAutoSlide = props.autoSlide;
  // const { mode } = props;
  // eslint-disable-next-line prefer-const
  //  let activeIndex = 0;
  let countdownInterval: any;
  const newSlides = slides;
  /**
   * Helper function to handle scrolling to a Carousel Item
   * @param {*} index The index of the item to scroll to
   * @returns {*} undefined
   */
  const scrollToItem = (index: any) => {
    const children = Array.prototype.slice.call(slidesRef.children);
    const childWidth = children.length > 0 ? children[0].offsetWidth : 0;

    slidesRef.scrollLeft = index * childWidth;
  };

  /**
   * Helper function to handle updating the active Carousel Item/Slide
   * @param {*} index The index of the item to go to
   * @returns {*} undefined
   */
  const goToSlide = (index: any) => {
    const isFullWidth = mode === carouselVariants.fullWidth;
    if (!isFullWidth) scrollToItem(index);
    setActive(index);
  };

  /**
   * Event handler for a click action to go to the previous Carousel Slide
   * @param {*} event DOM event
   * @returns {*} undefined
   */
  const goToPrevSlide = (event: any) => {
    event.preventDefault();

    let index = activeIndex;
    const slidesLength = slides && isNotEmptyArray(slides) && slides.length;
    if (index < 1) index = slidesLength;

    --index;

    if (isAutoSlide && countdownInterval) {
      resetTimeInterval(() => goToSlide(index));
    } else {
      goToSlide(index);
    }
  };

  /**
   * Event handler for a click action to go to the next Carousel Slide
   * @param {*} event DOM event
   * @returns {*} undefined
   */
  const goToNextSlide = (event: any) => {
    event && event.preventDefault();

    let index = activeIndex;
    const slidesLength = slides.length - 1;

    if (index === slidesLength) index = -1;

    ++index;

    if (event && isAutoSlide && countdownInterval) {
      resetTimeInterval(() => goToSlide(index));
    } else {
      goToSlide(index);
    }
  };

  /**
   * Helper to handle rendering the Carousel's indicators
   * @param {*} carouselProps Props passed to the parent Carousel
   * @returns {*} React.Component
   */
  const renderCarouselIndicators = ({
    indicatorClass,
    indicatorActiveClass,
    indicatorsWrapperClass,
    indicatorsComposedClass,
    renderIndicator,
  }: any): any => {
    return (
      <ul
        className={
          indicatorsWrapperClass ||
          composeClasses(carouselIndicators, indicatorsComposedClass)
        }
      >
        {Array.isArray(newSlides) &&
          newSlides.map((slide, index) => (
            <CarouselIndicator
              activeIndex={activeIndex}
              customActiveClass={indicatorActiveClass}
              customClass={indicatorClass}
              index={index}
              key={index}
              onClick={(evt: any) =>
                handleDOMEvent(evt, (cb: any) => {
                  resetTimeInterval(cb);
                  goToSlide(index);
                })
              }
              renderContent={renderIndicator}
              slide={slide}
            />
          ))}
      </ul>
    );
  };

  /**
   * Sets interval for carousel auto-slide
   * @returns {*} undefined
   */
  const setTimeInterval = () => {
    let customDuration;
    const autoSlideDuration = customDuration;

    if (isAutoSlide) {
      countdownInterval = setInterval(
        (e: any) => goToNextSlide(e),
        5000 || autoSlideDuration
      );
    }
  };

  /**
   * Resets the time interval after a click event
   * @param {*} cb callback function
   * @returns {*} undefined
   */
  const resetTimeInterval = (cb: any) => {
    clearTimeInterval();
    typeof cb === "function" && cb();
    setTimeInterval();
  };

  /**
   * Clears the time interval set
   * @returns {*} undefined
   */
  const clearTimeInterval = () => {
    // clears current setInterval
    if (isAutoSlide) {
      clearInterval(countdownInterval);
    }
  };

  /**
   * Lifecycle method
   * @returns {*} undefined
   */

  useEffect(() => {
    if (isAutoSlide) {
      setTimeInterval();
    }
    return () => {
      clearTimeInterval();
    };
  }, [activeIndex]);

  /**
   * Renders the Carousel
   * @returns {*} React.Component
   */
  const isFullWidth = mode === carouselVariants.fullWidth;

  // Todo: Add a fallback image
  const hasValidSlides = Array.isArray(slides);

  // Render indicator arrows only when there is more than one slide
  const renderArrows = hasValidSlides && slides.length > 1;

  return (
    <div className={composeClasses(carousel, wrapperClass)}>
      {renderArrows && showLeftArrow && (
        <CarouselArrow
          content=" "
          onClick={(event: any) => goToPrevSlide(event)}
          position="left"
          wrapperClass=""
        />
      )}

      <div
        className={composeClasses(
          isFullWidth ? "" : carouselInlineWrapper,
          customCarouselInlineWrapper
        )}
        ref={(node) => (slidesRef = node)}
      >
        {hasValidSlides &&
          slides.map((slide: any, index: any) =>
            isFullWidth ? (
              <CarouselSlide
                activeIndex={activeIndex}
                index={index}
                key={index}
                slide={slide}
                swipeLeft={(e: any) => goToNextSlide(e)}
                swipeRight={(e: any) => goToPrevSlide(e)}
              >
                {renderSlide(slide)}
              </CarouselSlide>
            ) : (
              <CarouselItem
                customClass={itemClass ? itemClass : ""}
                index={index}
                key={index}
              >
                {renderSlide(slide)}
              </CarouselItem>
            )
          )}
      </div>

      {renderArrows && showRightArrow && (
        <CarouselArrow
          content=" "
          onClick={(event: any) => goToNextSlide(event)}
          position="right"
          wrapperClass={arrowClass}
        />
      )}

      {renderArrows &&
        showIndicators &&
        renderCarouselIndicators({
          arrowClass,
          customCarouselInlineWrapper,
          itemClass,
          renderSlide,
          showIndicators,
          showLeftArrow,
          showRightArrow,
          wrapperClass,
        })}
    </div>
  );
};

Carousel.defaultProps = {
  autoSlideDuration: null,
};

export default Carousel;
