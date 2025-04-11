const firebase = require('firebase/app').default
require('dotenv').config()

function firebaseInit () {

  const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`
  };
      
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app()
  }
}

module.exports = firebaseInit

