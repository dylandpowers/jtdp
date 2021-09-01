import React from 'react';
import firebase from 'firebase';
import _ from 'lodash';

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
    this.firestore = firebase.firestore();
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

  getMoviesToWatch = (onSuccess, onError) => {
    this.firestore.collection('movies_to_watch').get().then((qs) => {
      const movies = [];
      qs.forEach((doc) => movies.push(doc.data()));
      onSuccess(movies);
    })
    .catch((err) => onError(err));
  };

  saveMovie = (movie, isWatched = false) => {
    const movieToSave = _.cloneDeep(movie);
    movieToSave.isWatched = isWatched;

    this.firestore.collection('movies').doc(`${movie.id}`).set(movieToSave)
      .catch((err) => console.error(err));
  }

  registerMovieSnapshotListener = (fn) => {
    return this.firestore.collection('movies').onSnapshot((snapshot) => {
      fn(snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data())
      })));
    });
  }

  rateMovie = (movie, rating, onSuccess) => {
    const ratingKey = this.auth.currentUser.email.startsWith('j') ? 'jasmineRating' : 'dylanRating';
    this.firestore.collection('movies').doc(`${movie.id}`).update({ 
      [ratingKey]: rating,
      isWatched: true,
    })
    .then(onSuccess)
    .catch((err) => console.error(err));
  }

  getMovieRefWithId = (id) => {
    return this.firestore.collection('movies').doc(`${id}`);
  }

  newBatch = () => {
    return this.firestore.batch();
  }

  getCurrentUserFirstName = () => {
    if (!this.auth.currentUser) {
      return '';
    }
    
    return this.auth.currentUser.email.startsWith('j') ? 'Jasmine' : 'Dylan';
  }
}

export const FirebaseContext = React.createContext(null);

export default Firebase;

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);