import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import Countdown from 'react-countdown';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import classNames from 'classnames';

import styles from './styles.module.css';
import { withFirebase } from '../../components/Firebase/firebase';
import CountdownDisplay from '../../components/CountdownDisplay';

const DYLAN_IMAGE_MODE = 'dylan-pics';
const COUPLE_IMAGE_MODE = 'couple-pics';
const ALL_IMAGE_MODE = 'all';

class SlideshowPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageMode: '',
      imageUrls: [],
      confettiNumber: 1
    };

    this.allImages = {};

    this.firebase = props.firebase;
    this.fetchAllImageUrls = this.fetchAllImageUrls.bind(this);
    this.updateImageUrlsAndImageMode = this.updateImageUrlsAndImageMode.bind(this);
    this.toggleConfetti = this.toggleConfetti.bind(this);
  }

  componentDidMount() {
    this.fetchAllImageUrls();
  }

  fetchAllImageUrls = (callback) => {
    this.firebase.fetchAllImageUrls(res => {
      if (res.success) {
        res.data.forEach((imageSet) => {
          this.allImages[imageSet.name] = imageSet.urls;
        });
        this.updateImageUrlsAndImageMode(COUPLE_IMAGE_MODE);
      } else {
        console.error(res.err);
      }
    });
  };

  updateImageUrlsAndImageMode = (newImageMode) => {
    let oldImageMode = this.state.imageMode;
    if (oldImageMode === newImageMode) {
      return;
    }

    var newImageUrls = [];
    if (newImageMode === ALL_IMAGE_MODE) {
      Object.keys(this.allImages).forEach((key) => newImageUrls.push(...this.allImages[key]));
    } else {
      newImageUrls.push(...this.allImages[newImageMode]);
    }
    this.setState({
      imageMode: newImageMode,
      imageUrls: this._shuffleArray(newImageUrls)
    });
  };

  toggleConfetti = () => {
    this.firebase.incrementConfettiCount();
    this.setState({ confettiNumber: this.state.confettiNumber + 1 });
  };

  _shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
    }



    const drawHeart = (context, x, y, width, height) => {
      context.beginPath();
      var topCurveHeight = height * 0.3;
      context.moveTo(x, y + topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
      );
                
      // bottom left curve
      context.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
        );
                
      // bottom right curve
      context.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
      );
                
      // top right curve
      context.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );

      context.stroke();
      context.fill();
      context.closePath();
    };

    const confettiElements = [];
    for (let i = 0; i < this.state.confettiNumber; i += 1) {
      confettiElements.push(<Confetti key={i} colors={["#ff00ff", "#ff0000", "#ffb6c1", "#ffc0cb"]} drawShape={context => drawHeart(context, 0, 0, 15, 15)} recycle={false} />);
    }

    return (
      <div className={styles.container}>
        {confettiElements}
        <div className={styles.buttonContainer}>
          <div 
            className={this.state.imageMode === COUPLE_IMAGE_MODE ? styles.buttonSelected : styles.button}
            role="button"
            onClick={(e) => this.updateImageUrlsAndImageMode(COUPLE_IMAGE_MODE)}
          >
            Couple
          </div>
          <div
            className={this.state.imageMode === ALL_IMAGE_MODE ? styles.buttonSelected : styles.button}
            role="button"
            onClick={(e) => this.updateImageUrlsAndImageMode(ALL_IMAGE_MODE)}
          >
            Both
          </div>
          <div 
            className={this.state.imageMode === DYLAN_IMAGE_MODE ? styles.buttonSelected : styles.button}
            role="button"
            onClick={(e) => this.updateImageUrlsAndImageMode(DYLAN_IMAGE_MODE)}
          >
            Dylan
          </div>
        </div>
        <div className={styles.mainContentContainer}>
          <div className={classNames(styles.paneContainer, 'left')}>
            <CountdownDisplay />
          </div>
          <Fade {...fadeProperties} className={styles.gallery}>
            {
              this.state.imageUrls.map((url, index) => <img key={index} src={url} className={styles.image} />)
            }
          </Fade>
          <div className={classNames(styles.paneContainer, 'right')}>
            <div
              className={styles.button}
              role="button"
              onClick={(e) => this.toggleConfetti()}
            >
              I love you!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebase(SlideshowPage));

