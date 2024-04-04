export class GManager {
  private static map: google.maps.Map;
  private static panorama: google.maps.StreetViewPanorama;
  private static panoramaContainer: HTMLElement;

  public static getMap(parent: HTMLElement, opts: google.maps.MapOptions) {
    let div: HTMLElement;
    if (!GManager.map) {
      div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      GManager.map = new google.maps.Map(div, opts);
    } else {
      div = GManager.map.getDiv();
    }
    parent.append(div);
    return GManager.map;
  }

  public static destroyMap() {
    if (GManager.map) {
      GManager.map.getDiv().remove();
    }
  }

  public static getPanorama(parent: HTMLElement, opts: google.maps.StreetViewPanoramaOptions) {
    if (!GManager.panorama) {
      GManager.panoramaContainer = document.createElement("div");
      GManager.panoramaContainer.style.width = "100%";
      GManager.panoramaContainer.style.height = "100%";
      GManager.panorama = new google.maps.StreetViewPanorama(GManager.panoramaContainer, opts);
    } else {
      GManager.panorama.setVisible(true);
    }
    parent.append(GManager.panoramaContainer);
    return GManager.panorama;
  }

  public static destroyPanorama() {
    GManager.panorama.setVisible(false);
    GManager.panoramaContainer.remove();
  }
}
