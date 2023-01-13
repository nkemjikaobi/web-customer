import React from "react";
import PropTypes from "prop-types";
/**
 * Icon component to get and render app icons
 * @param {Object} props Component properties
 * @returns {React.Component} Icon component
 */
const Icon = (props: any) => {
  if (props.name === "") {
    return null;
  }
  try {
    // eslint-disable-next-line no-undef
    const Image = require(`./stock/${props.name}`).default;
    if (Image) {
      return (
        <Image
          aria-label={props.name}
          className={`icon ${props.className}`}
          {...props}
        />
      );
    }
    return null;
  } catch (error: any) {
    return null;
  }
};
Icon.defaultProps = {
  className: "",
  onClick: () => {
    return null;
  },
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default Icon;
