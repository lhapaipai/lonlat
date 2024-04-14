import { Feature, Polygon } from "geojson";

export type IsochroneProperties = Omit<APISchemas["IsochroneResponse"], "geometry">;
export type IsochroneGeoJSON = Feature<Polygon, IsochroneProperties>;

export type APISchemas = {
  Constraint:
    | {
        key: "waytype";
        constraintType: "banned";
        operator: "=" | "!=";
        value: "autoroute" | "tunnel" | "pont";
      }
    | {
        key: "largeur_de_chaussee";
        constraintType: "banned";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "importance";
        constraintType: "banned" | "prefer" | "avoid";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "nature";
        constraintType: "banned";
        operator: "=" | "!=";
        value:
          | "sentier"
          | "bac_ou_liaison_maritime"
          | "bretelle"
          | "chemin"
          | "escalier"
          | "piste_cyclable"
          | "rond-point"
          | "route_a_1_chaussee"
          | "route_a_2_chaussees"
          | "route_empierree"
          | "type_autoroutier";
      }
    | {
        key: "restriction_de_hauteur";
        constraintType: "banned";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "restriction_de_largeur";
        constraintType: "banned";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "restriction_de_poids_total";
        constraintType: "banned";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "restriction_de_poids_par_essieu";
        constraintType: "banned";
        operator: "=" | "!=" | ">" | ">=" | "<" | "<=";
      }
    | {
        key: "matieres_dangereuses_interdites";
        constraintType: "banned";
        operator: "=" | "!=";
        value: "vrai" | "faux";
      }
    | {
        key: "itineraire_vert";
        constraintType: "banned" | "prefer" | "avoid";
        operator: "=" | "!=";
        value: "vrai" | "faux";
      }
    | {
        key: "cpx_classement_administratif";
        constraintType: "banned" | "prefer" | "avoid";
        operator: "=" | "!=";
        value:
          | "vide"
          | "autoroute"
          | "nationale"
          | "departementale"
          | "voie_communale"
          | "chemin_rural";
      };

  IsochroneRequest: {
    /**
     * format: "{lon},{lat}"
     * exemple: "6.4978,46.0918"
     */
    point: string;

    /**
     * pgr comme "pgrouting". "bdtopo-pgr" se base uniquement sur le nouveau moteur, mais
     * manque de performance sur de grandes isochrones. Elle est en revanche fonctionelle
     * pour de petites isochrones. "bdtopo-iso" se base sur les anciens services à partir
     * d'une certaine distance pour régler les soucis de performance. Nous vous
     * conseillons son utilisation pour les isochrones larges.
     *
     * La ressource bdtopo-iso disparaît au profit de la ressource bdtopo-valhalla ??
     */
    resource: "bdtopo-iso" | "bdtopo-pgr" | "bdtopo-valhalla";

    /**
     * Précise le type de calcul qui est fait : « time » (isochrone) ou « distance » (isodistance)
     * Valeur par défaut : "time"
     */
    costType?: "time" | "distance";

    /**
     * Valeur du coût utilisé pour le calcul. On pourra, par exemple, préciser une distance
     * ou un temps, selon le mode de calcul choisi (isodistance ou isochrone).
     * Important: doit être une chaîne de caractères. exemple : "300"
     * min : "30"
     * max : "50000"
     */
    costValue: string;

    /**
     * Valeur par défaut : "car"
     */
    profile?: "car" | "pedestrian";

    /**
     * Sens du parcours. Soit on définit un point de départ (« departure ») et on obtient
     * les points d'arrivée potentiels. Soit on définit un point d'arrivée (« arrival »)
     * et on obtient les points de départ potentiels.
     */
    direction?: "departure" | "arrival";

    constraints?: Array<APISchemas["ConstraintIso"]>;

    /**
     * Permet de préciser le format dans lequel la géométrie sera retournée :
     *    - "polyline" (format compressé google)
     *    - "geojson" (format standard)
     * Valeur par défaut : "geojson"
     */
    geometryFormat?: "geojson" | "polyline" | "wkt";

    /**
     * Valeur par défaut : "meter"
     */
    distanceUnit?: "meter" | "kilometer";

    /**
     * Permet de préciser l’unité dans laquelle les durées sont exprimées dans la réponse
     * Valeur par défaut : "second"
     */
    timeUnit?: "hour" | "minute" | "second";
    /**
     * Valeur par défaut : "EPSG:4326"
     */
    crs?: "EPSG:4326" | "EPSG:2154";
  };
  IsochroneResponse: {
    /**
     * format: "{lon},{lat}"
     * exemple: "6.4978,46.0918"
     */
    point: string;
    resource: "bdtopo-iso" | "bdtopo-pgr" | "bdtopo-valhalla";
    /**
     * exemple: "2024-04-10"
     */
    resourceVersion: string;
    costType: "time" | "distance";
    costValue: string;
    timeUnit?: "hour" | "minute" | "second";
    distanceUnit?: "meter" | "kilometer";
    profile: "car" | "pedestrian";
    direction: "departure" | "arrival";
    crs: "EPSG:4326" | "EPSG:2154";
    constraints: APISchemas["Constraint"][];
    geometry: Polygon;

    /** deprecié ?
     * departure?: string; // Format: date
     * arrival?: string;   // Format: date
     * alerts?: Array<{ message?: string }>;
     */
  };
};

export type APIEndpoints = {
  "/navigation/itineraire": {
    responses: {
      get: APISchemas["Response"];
    };
    requests: {
      method?: "get";
    };
  };
  "/navigation/isochrone": {
    responses: {
      get: APISchemas["IsochroneResponse"];
      post: APISchemas["IsochroneResponse"];
    };
    requests:
      | {
          method?: "get";
          query: APISchemas["IsochroneRequest"];
        }
      | {
          method: "post";
          body: APISchemas["IsochroneRequest"];
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
