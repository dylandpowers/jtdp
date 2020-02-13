import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import styles from './styles.module.css';
import { withFirebase } from '../../components/Firebase/firebase';

class SlideshowPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoUrl: '',
      firstImageFetched: false
    };

    this.firebase = props.firebase;
    this.fetchImageUrl = this.fetchImageUrl.bind(this);
  }

  componentDidMount() {
    this.fetchImageUrl();
  }

  fetchImageUrl = () => {
    this.firebase.getPhotoUrl(res => {
      if (res.success) {
        this.setState({ 
          photoUrl: res.url,
          firstImageFetched: true
        });
      } else {
        console.error(res.err);
      }
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <img 
          src={this.state.firstImageFetched ? this.state.photoUrl : '../../images/heart.png'}
          className={styles.image}
          alt="Dylan <3 Jasmine" 
        />
      </div>
    );
  }
}

export default withRouter(withFirebase(SlideshowPage));

