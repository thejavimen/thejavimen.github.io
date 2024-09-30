// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Inicializa Google Maps
let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -13.517088, lng: -71.978535 }, // Coordenadas iniciales
    zoom: 15,
  });

  marker = new google.maps.Marker({
    position: { lat: -13.517088, lng: -71.978535 },
    map: map,
    title: "Ubicación Actual",
  });

  // Escucha los cambios en Firebase en tiempo real
  const locationRef = database.ref("scooter/location");
  locationRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const { latitude, longitude } = data;
      const newPosition = { lat: latitude, lng: longitude };

      // Mueve el marcador a la nueva ubicación
      marker.setPosition(newPosition);
      map.panTo(newPosition);
    }
  });
}

// Iniciar el mapa al cargar la página
window.onload = initMap;
