if ("geolocation" in navigator) {
} else {
  console.log("geolocation not available");
}

document.getElementById("get-current-position")?.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude, accuracy } }) => {
      console.log("success, coords", longitude, latitude, accuracy);
    },
    (err) => {
      console.log("err", err);
    },
    {},
  );
  console.log("get current position");
});

let geolocationId: number | null = null;

// time interval :  20s quand précision de 1km
//                  1s  quand précision de 5m
document.getElementById("watch-position")?.addEventListener("click", () => {
  geolocationId = navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => {
      const { latitude, longitude, accuracy } = coords;
      console.log("success, coords", longitude, latitude, accuracy, timestamp);
    },
    (err) => {
      console.log("err", err);
    },
    {
      /**
       * valeur par défaut : false
       */
      enableHighAccuracy: true,
      /**
       * Cela spécifie la durée maximale, en millisecondes, pendant laquelle
       * la position peut être mise en cache.
       * Si une position plus récente est disponible, la méthode watchPosition utilisera
       * cette position plus récente au lieu de la position mise en cache.
       * Si aucune nouvelle position n'est disponible et que le délai maximum
       * est dépassé, la méthode utilisera la position mise en cache, même si elle est plus ancienne.
       * exprimée en ms
       * valeur par défaut : 0. le navigateur n'utilise pas de valeur en cache et doit tjs essayer de
       * récupérer une nouvelle position
       */
      maximumAge: 30000,

      /**
       * Ceci définit la durée maximale, en millisecondes, pendant laquelle l'API tente de récupérer
       * la position de l'utilisateur.
       * Si la position de l'utilisateur ne peut pas être obtenue dans ce délai, une erreur sera renvoyée.
       * Il est important de noter que le navigateur peut ignorer cette valeur dans certains cas,
       * notamment si l'utilisateur a désactivé la géolocalisation ou si la demande de géolocalisation
       * a été rejetée par l'utilisateur.
       * exprimée en ms
       * valeur par défaut : infinie
       */
      timeout: 18000,
    },
  );
  console.log("watch-position");
});

document.getElementById("clear-watch")?.addEventListener("click", () => {
  console.log("clear-watch");
  if (geolocationId) {
    navigator.geolocation.clearWatch(geolocationId);
    geolocationId = null;
  }
});
