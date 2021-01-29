import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBbMFKVXS_KzT1F5kkCn-2Xnl5TLeFRXp4",
  authDomain: "ecommerce-bccf1.firebaseapp.com",
  databaseURL: "https://ecommerce-bccf1.firebaseio.com",
  projectId: "ecommerce-bccf1",
  storageBucket: "ecommerce-bccf1.appspot.com",
  messagingSenderId: "1029504972281",
  appId: "1:1029504972281:web:58a7124b25df0b61d77928",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
