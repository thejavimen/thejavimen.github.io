// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4xj2iaaewQ-gCSZfvZhTgAC5PmHCMxho",
  authDomain: "basedatos1-c3ea7.firebaseapp.com",
  databaseURL: "https://basedatos1-c3ea7-default-rtdb.firebaseio.com",
  projectId: "basedatos1-c3ea7",
  storageBucket: "basedatos1-c3ea7.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghij123456"
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
