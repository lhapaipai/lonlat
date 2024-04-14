type ElevationRequest = {
  lon: string;
  lat: string;
  // identifiant de la donnée altimétrique sollicitée
  resource: "ign_rge_alti_wld";

  /**
   * Valeur par défaut : "|"
   */
  delimiter?: "|" | ";" | ",";

  /**
   * Valeur par défaut : false
   */
  indent?: "true" | "false";

  /**
   * choix d'une altitude d'une source unique ou de plusieurs sources
   * (dans ce cas avec informations sur la source et la précision : LIDAR, Corrélation...)
   * Format : booléen (texte)
   * Valeurs possibles : false (une altitude par point), true (une ou plusieurs
   * altitudes par point en fonction du nombre de pyramides associées à la "resource")
   * Valeur par défaut : false
   */
  measures?: "true" | "false";

  /**
   * Tableau d'altitude ou réponse étendue
   * Valeur par défaut : false
   */
  zonly?: "true" | "false";
};

export type APISchemas = {
  ElevationRequest: ElevationRequest;
  /**
   * Pour un point située dans une zone non couverte par la donnée,
   * l'altitude renvoyée sera "-99999"
   * Les altitudes fournies sont arrondies à 2 chiffres après la virgule
   */
  ElevationResponseZonly: {
    elevations: number[];
  };

  ElevationResponse: {
    elevations: {
      lon: number;
      lat: number;
      z: number;
      acc: string;

      /** si measures activé */
      measures?: {
        z: number;
        source_name: string;
        source_measure: string;
        acc: string;
        title: string;
      }[];
    }[];
  };

  ElevationLineRequest: ElevationRequest & {
    /**
     * Valeurs possibles :
     *    - simple (calcul classique)
     *    - accurate (permet de doubler la valeur du paramètre "sampling" afin de
     *      gagner en précision mais avec un temps de réponse plus long)
     * Valeur par défaut : simple
     */
    profile_mode: "simple" | "accurate";

    /**
     * nombre de points constituant l'échantillonnage
     * Format : entier
     * Valeurs possibles : de 2 à 5000
     * Valeur par défaut : le nombre de couples (lon,lat)
     * Contrainte : ne doit pas dépasser 5000
     */
    sampling: number;
  };
  ElevationLineResponse: {
    /**
     * Zonly n'a pas d'impact, la réponse sera toujours complete
     */
    elevations: {
      lon: number;
      lat: number;
      z: number;
      acc: string;
    }[];

    height_differences: {
      positive: number;
      negative: number;
    };
  };

  ResourceResponse: {
    content: string;
    resources: {
      // valeur que l'on placera ensuite dans : `resource`
      _id: string;
      title: string;
      bbox: {
        east: number;
        north: number;
        west: number;
        south: number;
      };
    }[];
  };

  ErrorResponse: {
    error: {
      code: string;
      description: string;
    };
  };
};

export type APIEndpoints = {
  /**
   * Permet de questionner l'IGN sur le nom des services mis à disposition pour récupérer
   * l'information altimétrique (valeur que l'on placera ensuite dans : `resource`).
   * pour le moment nous n'avons que `ign_rge_alti_wld`.
   */
  "/altimetrie/resources": {
    responses: {
      get: APISchemas["ResourceResponse"];
    };
    requests: {
      method?: "get";
      query: {
        keywords: string;
      };
    };
  };

  "/altimetrie/1.0/calcul/alti/rest/elevation.{format}": {
    responses: {
      get: APISchemas["ElevationResponse"] | APISchemas["ElevationResponseZonly"];
      post: APISchemas["ElevationResponse"] | APISchemas["ElevationResponseZonly"];
    };
    requests:
      | {
          method?: "get";
          urlParams: {
            format: "json" | "xml";
          };
          query: APISchemas["ElevationRequest"];
        }
      | {
          method: "post";
          urlParams: {
            format: "json" | "xml";
          };
          body: APISchemas["ElevationRequest"];
        };
  };
  "/altimetrie/1.0/calcul/alti/rest/elevationLine.{format}": {
    responses: {
      get: APISchemas["ElevationLineResponseZonly"];
    };
    requests:
      | {
          method?: "get";
          urlParams: {
            format: "json" | "xml";
          };
          query: APISchemas["ElevationLineRequest"];
        }
      | {
          method: "post";
          urlParams: {
            format: "json" | "xml";
          };
          body: APISchemas["ElevationLineRequest"];
        };
  };
};

export type APIPaths = keyof APIEndpoints;

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"];

export type APIMethods<T extends APIPaths> = NonNullable<APIRequests<T>["method"]>;

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM };
  }[M],
  "method"
> & { method?: M };

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get";

export type APIResponse<T extends APIPaths, M extends string | undefined> =
  DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
    ? APIEndpoints[T]["responses"][DefaultToGet<M>]
    : never;
