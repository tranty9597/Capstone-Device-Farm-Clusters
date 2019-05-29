import * as firebase from 'firebase';
import { FirebaseConfig } from '../configs';

const FirebaseApp = firebase.initializeApp(FirebaseConfig);

const FirDatabase = FirebaseApp.database()

export { FirDatabase }