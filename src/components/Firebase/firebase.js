import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "jtdp-60b3d.firebaseapp.com",
  databaseURL: "https://jtdp-60b3d.firebaseio.com",
  projectId: "jtdp-60b3d",
  storageBucket: "jtdp-60b3d.appspot.com",
  messagingSenderId: "786415873557",
  appId: "1:786415873557:web:defecb2e86a857bf8b281c"
};

const PICS_FOLDER = 'couple-pics';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {function} callback
   * 
   * JASMINE PASSWORD: i am the prettiest girl
   */
  signInWithEmail = (email, password, callback) => {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => callback({ success: true }))
      .catch(err => callback({ success: false, err: err }));
  };

  getPhotoUrl = (callback) => {
    this.storage.ref(`${PICS_FOLDER}/pic1.jpg`)
      .getDownloadURL()
      .then(url => callback({ success: true, url: url }))
      .catch(err => callback({ success: false, err: err }));
  }
}

const FirebaseContext = React.createContext(null);

export default Firebase;

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext };