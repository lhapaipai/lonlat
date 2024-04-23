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

document.getElementById("watch-position")?.addEventListener("click", () => {
  navigator.geolocation.watchPosition(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("err", err);
    },
    {},
  );
  console.log("watch-position");
});

document.getElementById("clear-watch")?.addEventListener("click", () => {
  console.log("clear-watch");
});
