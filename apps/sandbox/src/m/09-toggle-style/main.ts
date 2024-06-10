import "../../main.css";
import "~/shared/main.css";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");
const $styles = document.getElementById("styles")!;
const $currentStyle = document.getElementById("current-style")!;

const marignier: maplibre.LngLatLike = [6.498, 46.089];

const styles = [
  "ign.adminexpress.standard",
  "ign.bdtopo.classique",
  "ign.bdtopo.bati",
  "ign.bdtopo.hydrographie",
  "ign.bdtopo.routier",
  "ign.bdtopo.bati_date",
  "ign.bdtopo.bati_etages",
  "ign.isohypse.isohypse_multicolore",
  "ign.isohypse.isohypse_marron",
  "ign.isohypse.isohypse_orange",
  "ign.ocsge.ocsge_couverture",
  "ign.ocsge.ocsge_usage",
  "ign.ocsge.ocsge_occupation",
  "ign.pci.noir_et_blanc",
  "ign.pci.pci",
  "ign.plan.ign.standard",
  "ign.plan.ign.attenue",
  "ign.plan.ign.gris",
  "ign.plan.ign.sans_toponymes",
  "ign.plan.ign.toponymes",
  "ign.plan.ign.accentue",
  "ign.plan.ign.classique",
  "ign.plan.ign.epure",
];
const entities = {
  "ign.adminexpress.standard": {
    title: "IGN > Admin Express > adminexpress",
    url: "/assets/styles/ign/ADMIN_EXPRESS/adminexpress.json",
  },
  "ign.bdtopo.classique": {
    title: "IGN > Plan IGN > classique",
    url: "/assets/styles/ign/BDTOPO/classique.json",
  },
  "ign.bdtopo.bati": {
    title: "IGN > BD TOPO > bati",
    url: "/assets/styles/ign/BDTOPO/bati.json",
  },
  "ign.bdtopo.hydrographie": {
    title: "IGN > BD TOPO > hydrographie",
    url: "/assets/styles/ign/BDTOPO/hydrographie.json",
  },
  "ign.bdtopo.routier": {
    title: "IGN > BD TOPO > routier",
    url: "/assets/styles/ign/BDTOPO/routier.json",
  },
  "ign.bdtopo.bati_date": {
    title: "IGN > BD TOPO > bati date",
    url: "/assets/styles/ign/BDTOPO/bati_date.json",
  },
  "ign.bdtopo.bati_etages": {
    title: "IGN > BD TOPO > bati étages",
    url: "/assets/styles/ign/BDTOPO/bati_etages.json",
  },
  "ign.isohypse.isohypse_multicolore": {
    title: "IGN > Courbes de niveau > isohypse multicolore",
    url: "/assets/styles/ign/ISOHYPSE/isohypse_multicolore.json",
  },
  "ign.isohypse.isohypse_marron": {
    title: "IGN > Courbes de niveau > isohypse marron",
    url: "/assets/styles/ign/ISOHYPSE/isohypse_monochrome_marron.json",
  },
  "ign.isohypse.isohypse_orange": {
    title: "IGN > Courbes de niveau > isohypse orange",
    url: "/assets/styles/ign/ISOHYPSE/isohypse_monochrome_orange.json",
  },
  "ign.ocsge.ocsge_couverture": {
    title: "IGN > OCS GE > ocsge couverture",
    url: "/assets/styles/ign/OGSGE/ocsge_couverture.json",
  },
  "ign.ocsge.ocsge_usage": {
    title: "IGN > OCS GE > ocsge usage",
    url: "/assets/styles/ign/OGSGE/ocsge_usage.json",
  },
  "ign.ocsge.ocsge_occupation": {
    title: "IGN > OCS GE > ocsge occupation",
    url: "/assets/styles/ign/OGSGE/ocsge_occupation.json",
  },
  "ign.pci.noir_et_blanc": {
    title: "IGN > Parcellaire Express > Noir et blanc",
    url: "/assets/styles/ign/PCI/noir_et_blanc.json",
  },
  "ign.pci.pci": {
    title: "IGN > Parcellaire Express > Pci",
    url: "/assets/styles/ign/PCI/pci.json",
  },
  "ign.plan.ign.standard": {
    title: "IGN > Plan IGN > Standard",
    url: "/assets/styles/ign/PLAN.IGN/standard.json",
  },
  "ign.plan.ign.attenue": {
    title: "IGN > Plan IGN > Attenué",
    url: "/assets/styles/ign/PLAN.IGN/attenue.json",
  },
  "ign.plan.ign.gris": {
    title: "IGN > Plan IGN > Gris",
    url: "/assets/styles/ign/PLAN.IGN/gris.json",
  },
  "ign.plan.ign.sans_toponymes": {
    title: "IGN > Plan IGN > Sans Toponymes",
    url: "/assets/styles/ign/PLAN.IGN/sans_toponymes.json",
  },

  "ign.plan.ign.toponymes": {
    title: "IGN > Plan IGN > Toponymes",
    url: "/assets/styles/ign/PLAN.IGN/toponymes.json",
  },
  "ign.plan.ign.accentue": {
    title: "IGN > Plan IGN > Accentué",
    url: "/assets/styles/ign/PLAN.IGN/accentue.json",
  },
  "ign.plan.ign.classique": {
    title: "IGN > Plan IGN > Classique",
    url: "/assets/styles/ign/PLAN.IGN/classique.json",
  },
  "ign.plan.ign.epure": {
    title: "IGN > Plan IGN > Épuré",
    url: "/assets/styles/ign/PLAN.IGN/epure.json",
  },
};

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: marignier,
  zoom: 8,
});

styles.forEach((styleId) => {
  const style: {
    title: string;
    url: string;
  } = entities[styleId as keyof typeof entities];
  const $button = document.createElement("button");
  $button.classList.add("block");
  $button.innerText = style.title;
  $button.addEventListener("click", () => {
    map.setStyle(style.url, {
      diff: true,
      // transformStyle: (previousStyle, nextStyle) => {
      //   return nextStyle;
      // },
    });
    $currentStyle.innerText = style.title;
  });
  $styles.appendChild($button);
});

document.getElementById("action-1")?.addEventListener("click", () => {
  map.addSource("terrarium", {
    type: "raster-dem",
    tiles: [
      "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
    ],
    encoding: "terrarium",
    tileSize: 256,
  });
});

document.getElementById("action-2")?.addEventListener("click", () => {
  map.setTerrain({
    source: "terrarium",
    exaggeration: 1,
  });
});

map.on("styledata", () => console.log("styledata"));
map.on("terrain", () => console.log("terrain"));
