import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;

const getUser = () => firebase.auth().currentUser;


export default { getUid, getUser };
