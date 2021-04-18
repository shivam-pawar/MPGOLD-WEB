import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIlIcwJK00oWryRKwNnegwDQsva43_PoU",
  authDomain: "mpgold-web.firebaseapp.com",
  projectId: "mpgold-web",
  storageBucket: "mpgold-web.appspot.com",
  messagingSenderId: "196964633316",
  appId: "1:196964633316:web:845befeb40777ca81e7af1",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase.database();
