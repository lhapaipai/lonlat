import { LngLatObj } from "maplibre-react-components";
import { getLngLatObj } from ".";

const streetViewPanoramaDefaultOptions: google.maps.StreetViewPanoramaOptions = {
  addressControlOptions: {
    position: 6, // google.maps.ControlPosition.BOTTOM_CENTER,
  },
  linksControl: false,
  panControl: false,
  enableCloseButton: true,
};

/**
 * GManager instantiates only one streetview object within which it renders on demand.
 * This helps resolve issues related to the fact that it is not possible to unmount a
 * streetview instance. the same goes for event listeners.
 * GManager survives React StreetView component lifecycle.
 */
export default class GManager {
  private static panorama: google.maps.StreetViewPanorama;
  private static panoramaContainer: HTMLElement;
  private static handlers: {
    handlePosChanged?: (lngLat: LngLatObj) => void;
    handlePovChanged?: (pov: google.maps.StreetViewPov) => void;
    handleVisibleChanged?: (isVisible: boolean) => void;
  } = {};

  private static onPosChanged() {
    // we need timeout because google corrects the position of pegman to be located
    // closest to the area where photos were taken
    setTimeout(() => {
      const gLngLat = getLngLatObj(GManager.panorama.getPosition());
      if (!gLngLat) {
        return;
      }

      if (GManager.handlers?.handlePosChanged) {
        GManager.handlers?.handlePosChanged(gLngLat);
      }
    }, 0);
  }

  private static onPovChanged() {
    const pov = GManager.panorama.getPov();
    if (!pov) {
      return;
    }
    if (GManager.handlers?.handlePovChanged) {
      GManager.handlers?.handlePovChanged(pov);
    }
  }

  private static onVisibleChanged() {
    if (GManager.handlers?.handleVisibleChanged) {
      GManager.handlers?.handleVisibleChanged(GManager.panorama.getVisible());
    }
  }

  public static createOrGetPanorama(
    parent: HTMLElement,
    options: google.maps.StreetViewPanoramaOptions,
    handlers: {
      handlePosChanged?: (lngLat: LngLatObj) => void;
      handlePovChanged?: (pov: google.maps.StreetViewPov) => void;
      handleVisibleChanged?: (isVisible: boolean) => void;
    } = {},
  ) {
    const isCreation = !GManager.panorama;

    if (isCreation) {
      console.log("createPanorama from singleton");
      const div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      GManager.panorama = new google.maps.StreetViewPanorama(div, {
        ...streetViewPanoramaDefaultOptions,
        ...options,
      });

      GManager.panoramaContainer = div;

      GManager.panorama.addListener("pano_changed", GManager.onPosChanged);
      GManager.panorama.addListener("pov_changed", GManager.onPovChanged);
      GManager.panorama.addListener("visible_changed", GManager.onVisibleChanged);
    } else {
      const { position, pov } = options;
      console.log("getPanorama from singleton");
      position && GManager.panorama.setPosition(position);
      pov && GManager.panorama.setPov(pov);
      GManager.panorama.setVisible(true);
    }

    GManager.handlers = handlers;

    parent.append(GManager.panoramaContainer);
    return GManager.panorama;
  }

  public static hidePanorama() {
    GManager.panorama.setVisible(false);
    GManager.panoramaContainer.remove();
  }
}
