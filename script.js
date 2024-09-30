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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -16.398982, lng: -71.536750 }, // Coordenadas iniciales
    zoom: 15,
  });
  // Ícono de scooter personalizado
    const scooterIcon = {
        url: 'scooter-marker.png',  // Ruta del ícono personalizado
        scaledSize: new google.maps.Size(51, 51),  // Tamaño del ícono
    };

  marker = new google.maps.Marker({
    position: { lat: -16.398982, lng: -71.536750 },
    map: map,
    icon:scooterIcon
  });

  // Escucha los cambios en Firebase en tiempo real
  const locationRef = database.ref("scooter/ubicacion");
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
