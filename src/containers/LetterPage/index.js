import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 

import { withFirebase } from '../../components/Firebase/firebase';
import styles from './styles.module.css';
import heart from './heart.png';

class LetterPage extends Component {
  constructor(props) {
    super(props);

    this.firebase = props.firebase;

    this.state = {
      letter: ''
    };
  }

  componentDidMount() {
    this.firebase.fetchLetter('six-month', (res) => {
      if (!res.success) {
        console.error('Error retrieving data');
      } else {
        this.setState({ letter: res.text });
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          {this.state.letter.split('\\n').map(text => <p>{text}</p>)}
        </div>
        <div className={styles.image}>
          <img src={heart} />
        </div>
      </div>
    );
  }
}

export default withFirebase(withRouter(LetterPage));