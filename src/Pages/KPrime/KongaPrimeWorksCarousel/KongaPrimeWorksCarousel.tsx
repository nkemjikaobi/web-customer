import React, { Component } from "react";
import KongaPrimeWorksInfo from "../KongaPrimeWorksInfo/KongaPrimeWorksinfo";
import KongaPrimeHowItWorks_Header from "../KongaPrimeHowItWorks_Header/KongaPrimeHowItWorks_Header";

/**
 * @param {number} index Takes in the index
 *  @returns {React.Component} This returns react component
 */
class KongaPrimeWorksCarousel extends Component<any, any> {
  /**
   * Constructor
   * @param {*} props Props
   */
  constructor(props: any) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  /**
   * Handles the state for the current index
   * @param {object} inputData object
   * @returns {number} currentIndex
   */
  componentDidMount() {
    setInterval(this.incrementCurrentIndex, 10000);
  }
  /**
   * Handles the state for the current index
   * @param {object} inputData object
   * @returns {number} state
   */
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {
      return;
    };
  }

  incrementCurrentIndex = (index: number) => {
    this.setState((prevState: any) => {
      let currentIndex: number;
      if ([...this.props.howItWorksData.keys()].includes(index)) {
        currentIndex = index;
      } else {
        currentIndex =
          prevState.currentIndex === this.props.howItWorksData.length - 1
            ? 0
            : prevState.currentIndex + 1;
      }
      return {
        currentIndex,
      };
    });
  };

  switchIndex = (currentIndex: number) => {
    this.setState({ currentIndex });
  };

  /**
   * @returns {React.Component} This returns react component
   */
  render() {
    const { currentIndex }: any = this.state;
    const { howItWorksData, kongaPrimePageData }: any = this.props;

    if (!kongaPrimePageData || !howItWorksData) return null;

    return (
      <div>
        <KongaPrimeHowItWorks_Header
          currentIndex={currentIndex}
          key={currentIndex}
          kongaPrimePageData={kongaPrimePageData}
          switchToCurrent={this.switchIndex}
        />
        <KongaPrimeWorksInfo
          content={howItWorksData[currentIndex].description}
          currentIndex={currentIndex}
          gif={howItWorksData[currentIndex].image}
          heading={howItWorksData[currentIndex].title}
          incrementIndex={this.incrementCurrentIndex}
          number={currentIndex + 1}
        />
      </div>
    );
  }
}

export default KongaPrimeWorksCarousel;
