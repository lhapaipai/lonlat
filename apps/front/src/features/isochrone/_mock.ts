/* for handle process */

/*
(
  new Promise((resolve) => {
    setTimeout(() => {
      fetch("/api-mocks/isochrone-distance.json")
        .then((res) => res.json())
        .then(({ geometry, ...properties }) => {
          resolve({
            type: "Feature",
            properties,
            geometry,
          } as IsochroneGeoJSON);
        });
    }, 500);
  }) as Promise<IsochroneGeoJSON>
)
  .then((isochroneFeature: IsochroneGeoJSON) => {
    if (!isAbortedRef.current) {
      dispatch(featureChanged(isochroneFeature));
    }
  })
  .catch((err) => void notifyError(err))
  .finally(() => {
    setLoading(false);
    isAbortedRef.current = false;
  });
  */
