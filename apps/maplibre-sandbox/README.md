```ts
const point = [lng, lat];

// retourne un tableau de MapGeoJSONFeature
// qui sont affichées à l'emplacement spécifié par le point sur le
// calque : building
// on peut spécifier plusieurs calques et avoir plusieurs features.
const features = map.queryRenderedFeatures(point, {
  layers: ["building"]
})


/**
 * une source qui a activé la clusterisation contient des features en plus représentant les cluster eux-mêmes
 * {
 *    "type": "Feature",
 *    "properties": {
 *      cluster: true
 *      cluster_id: 6239
 *      point_count: 1006
 *      point_count_abbreviated: "1k"
 *    }
 * }
 */
// cela nous donne le zoom à partir duquel le cluster se dématérialise.
// getClusterExpansionZoom renvoie une promesse
const zoom = await map.getSource("earthquakes").getClusterExpansionZoom(clusterId);

/**
 * Une manière d'animer une ligne de type GeoJSON est de lui ajouter au fil du temps des segments et de réafecter la donnée à la source
 * Fonctionne mais ne semble pas très performant.
 */
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[0, 0]],
      },
    },
  ],
};
map.addSource("line", {
  type: "geojson",
  data: geojson
});
function animationLoop() {
  geojson.features[0].geometry.coordinates.push([6, 45])
  map.getSource("line").setData(geojson)
}


// pour mettre à jour dynamiquement un style
map.setPaintProperty(
  "building", // layerName
  "fill-color",
  "#eeeeee"
)

type GetResourceResponse = {
	cacheControl?: string | null;
	expires?: Date | string | null;
	data: HTMLImageElement | ImageBitmap;
};
type ImageData = {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
}
interface StyleImageInterface {
	width: number;
	height: number;
	data: Uint8Array | Uint8ClampedArray;
	/**
	 * This method is called once before every frame where the icon will be used.
	 * The method can optionally update the image's `data` member with a new image.
	 *
	 * If the method updates the image it must return `true` to commit the change.
	 * If the method returns `false` or nothing the image is assumed to not have changed.
	 *
	 * If updates are infrequent it maybe easier to use {@link Map#updateImage} to update
	 * the image instead of implementing this method.
	 *
	 * @returns `true` if this method updated the image. `false` if the image was not changed.
	 */
	render?: () => boolean;
	/**
	 * Optional method called when the layer has been added to the Map with {@link Map#addImage}.
	 *
	 * @param map - The Map this custom layer was just added to.
	 */
	onAdd?: (map: Map$1, id: string) => void;
	/**
	 * Optional method called when the icon is removed from the map with {@link Map#removeImage}.
	 * This gives the image a chance to clean up resources and event listeners.
	 */
	onRemove?: () => void;
}
type ImageLike = HTMLImageElement | ImageBitmap | ImageData | StyleImageInterface

const image: GetResourceResponse = await map.loadImage("https://...")
map.addImage("icon", image.data as ImageLike)


const customImage: StyleImageInterface = {
  width: 200,
  height: 200,
  data: new Uint8Array(200 * 200 * 4),
  // called when layer is added to the map
  onAdd() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  }
  // called once before every frame where the icon will be used
  render() {
    const context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);

    this.data = context.getImageData(
        0,
        0,
        this.width,
        this.height
    ).data;

    // continuously repaint the map, resulting in the smooth animation of the dot
    // sinon si la carte est dans un état qui ne bouge pas l'animation s'arrête.
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  }
}
map.addImage('custom-image', customImage, {pixelRatio: 2});
```



## TypeScript

```ts
const point: GeoJSON.GeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: origin,
      },
    },
  ],
};

(map.getSource("point") as GeoJSONSource).setData(point);
```
