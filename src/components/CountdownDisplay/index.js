import React from 'react';
import Countdown from 'react-countdown';

import styles from './styles.module.css';

class CountdownDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {

    const renderer = (props) => {
      if (props.completed) {
        return <div className={styles.text}>We're together!</div>;
      }

      return <div className={styles.text}>{props.days}d {props.hours}h {props.minutes}m {props.seconds}s</div>;
    };

    return (
      <div className={styles.container}>
        <u className={styles.smallText}>
          Countdown
        </u>
        <Countdown
          date="2020-02-22T15:52:00"
          renderer={renderer}
        >
        </Countdown>
      </div>
    );
  }
}

export default CountdownDisplay;