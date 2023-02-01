  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { 

    getFirestore, // inicializar firebas 
    collection, //hacer llamado a la coleccion y obtener los datos 
    addDoc, // para agregar un id a la base de datos
    getDocs, // para traer los datos de la base de datos (fireStore)
    deleteDoc, // para eliminar de la base de datos (fireStore)
    onSnapshot, // este metodo se utiliza para actualizar en tiempo real 
    doc, // obtener datos de un solo documento 
    getDoc, // obtener un documento
    updateDoc, // para actualizar un documento



   } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD36U2HT9it_66z2NCYSCFrLVZFgI5mY-4",
    authDomain: "fir-crud-500fc.firebaseapp.com",
    projectId: "fir-crud-500fc",
    storageBucket: "fir-crud-500fc.appspot.com",
    messagingSenderId: "392338546333",
    appId: "1:392338546333:web:2c34a02dec08e9e26bfe74"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db =getFirestore();

    // con esta funcion agregamos al cloud 
  export const saveTask = (title, description) => 
    addDoc(collection(db, 'tasks') , {title, description});

    //con esta funcion llamamos del cloud 
  export const getTasks = () => getDocs(collection(db, 'tasks'));


  export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback); 

  export const deleteTasks = id => deleteDoc(doc(db, 'tasks', id));

  export const getTask = id => getDoc(doc(db, 'tasks', id));

  export const updateTask = (id, newFilds) => updateDoc(doc(db, 'tasks', id), newFilds);
