// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, query, where, getDocs,} from "firebase/firestore";

//Firebase Environment Variables
const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const databaseURL = process.env.FIREBASE_DATABASE_URL;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export default async function Recados(request, response) {
  //Query many docs with conditions
  const q = query(collection(db, "recados"), where("completed", "==", false));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  //pegando o valor recebido dinamicamente pelo path site.com/api/produtos/1/
  //(onde 1 é o valor exemplo recebido dinamicamente)
  const docId = request.query.docId;

  //Query one doc or one info
  const docRef = doc(db, "recados", `${docId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    var title = docSnap.data().title;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  //Response main da API
  response.json({
    id: id,
    title: title,
  });
}
