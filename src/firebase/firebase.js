import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export {
  firebase,
  googleAuthProvider,
  githubAuthProvider,
  database as default
};

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snap => {
//   console.log(snap.key, snap.val());
// });

// database.ref('expenses').on('child_added', snap => {
//   console.log(snap.key, snap.val());
// });

// database.ref('expenses').on('value', snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     const expense = childSnapshot.val();
//     expenses.push({
//       id: childSnapshot.key,
//       ...expense
//     });
//   });
//   console.log(expenses);
// });

// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   });

// database.ref('expenses').push({
//   description: 'Gas bill',
//   notes: 'Gas bill',
//   amount: 50000,
//   createdAt: 5000
// });

// database.ref('notes').push({
//   title: 'course topics',
//   body: 'react native, angular, python'
// });

// database.ref().on('value', snapshot => {
//   const employee = snapshot.val();
//   console.log(
//     `${employee.name} is a ${employee.job.title} at ${employee.job.company}`
//   );
// });

// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     console.log(snapshot.val());
//   },
//   error => console.log('error : ', error)
// );

// setTimeout(() => {
//   database.ref('age').set(39);
// }, 3500);

// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(35);
// }, 10500);

// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     console.log(snapshot.val());
//   })
//   .catch(error => console.log('error : ', error));

// database
//   .ref()
//   .set({
//     name: 'Tamer Fouad',
//     age: 35,
//     stresslevel: 8,
//     job: {
//       title: 'Software developer',
//       company: 'Hindawi'
//     },
//     location: {
//       city: 'Cairo',
//       country: 'Egypt'
//     }
//   })
//   .then(() => console.log('data is saved!'))
//   .catch(error => {
//     console.log(error);
//   });

// database.ref().update({
//   stresslevel: 10,
//   'job/company': 'Amazon',
//   'location/city': 'Alex'
// });

// database
//   .ref()
//   .remove()
//   .then(() => {
//     console.log('isSingle is removed!');
//   })
//   .catch(error => {
//     console.log('Error: ', error);
//   });
