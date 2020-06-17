import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const DYLAN_PICS_DIRNAME = 'dylan-pics/';
const COUPLE_PICS_DIRNAME = 'couple-pics/';

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
   */
  signInWithEmail = (email, password, callback) => {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => callback({ success: true }))
      .catch((err) => callback({ success: false, err: err }));
  };

  /**
   * @param {function} callback
   */
  fetchAllImageUrls = (callback) => {
    this.storage.ref()
      .listAll()
      .then((res) => {
        Promise.all(res.prefixes.map((prefix) => {
          return new Promise((resolve, reject) => {
            prefix.listAll().then((prefixRes) => {
              Promise.all(prefixRes.items.map((item) => item.getDownloadURL()))
                .then((urls) => resolve({ name: prefix.name, urls: urls }))
                .catch((err) => reject(err));
            }).catch((err) => reject(err));
          });
        })).then((data) => callback({ success: true, data: data }))
        .catch((err) => callback({ success: false, err: err }))
      }).catch((err) => callback({ success: false, err: err }));
  }

  /**
   * @param {string} title title of the letter
   * @param {function} callback
   */
  fetchLetter = (title, callback) => {
    firebase.database().ref()
      .child('letters')
      .once('value', (snapshot) => {
        if (!snapshot.val()) {
          callback({ success: false });
          return;
        }

        const data = snapshot.val()[title];
        callback({ success: true, text: data });
      });
  }

  incrementConfettiCount = () => {
    const user = this.auth.currentUser;
    if (user) {
      var childName;
      // this is hacky buuuut whatever
      if (user.email.startsWith('j')) {
        childName = 'Jasmine';
      } else {
        childName = 'Dylan'
      }
      firebase.database()
        .ref('clicks')
        .child(childName)
        .transaction(currentNum => (currentNum || 0) + 1);
    }
  };

  /**
   * @param {object} image
   * @param {string} imageType should either be 'Dylan' or 'Couple'
   */
  uploadDylanImage = (image, imageType) => {
    const imageDirectory = imageType === 'Dylan' ? DYLAN_PICS_DIRNAME : COUPLE_PICS_DIRNAME;
    this.storage.ref()
      .child(imageDirectory + image.name)
      .put(image);
  };
}

const FirebaseContext = React.createContext(null);

export default Firebase;

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext };