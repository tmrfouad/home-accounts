import {
  firebase,
  googleAuthProvider,
  githubAuthProvider
} from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const startLoginWithGoogle = () => {
  return () => firebase.auth().signInWithPopup(googleAuthProvider);
};

export const startLoginWithGithub = () => {
  return () => firebase.auth().signInWithPopup(githubAuthProvider);
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => firebase.auth().signOut();
};
