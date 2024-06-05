const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVwuVub-7rxA9xbkVHAvldNLPPwHI-1ns",
  authDomain: "solitekwebapp.firebaseapp.com",
  projectId: "solitekwebapp",
  storageBucket: "solitekwebapp.appspot.com",
  messagingSenderId: "950564222431",
  appId: "1:950564222431:web:5e8508296c97832153c06a",
  measurementId: "G-K478Z3CW8C"
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Configuración de Multer
const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${uuidv4()}`);
  const metadata = {
    contentType: file.mimetype
  };

  try {
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen a Firebase Storage:", error);
    throw error;
  }
};

module.exports = {
  upload,
  uploadImage
};
