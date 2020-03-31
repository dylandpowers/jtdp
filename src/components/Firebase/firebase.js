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