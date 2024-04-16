import { Feature, LineString, Polygon } from "geojson";

export type IsochroneProperties = Omit<APISchemas["IsochroneResponse"], "geometry">;
export type IsochroneGeoJSON = Feature<Polygon, IsochroneProperties>;

/**
 * Les contraintes applicables dépendent de la ressource utilisée : osrm / pgr mais pas de la requête : isochrone / itinéraire.
 */
export type APISchemas = {
  OsrmConstraint: {
    key: "waytype";
    constraintType: "banned";
    operator: "=" | "!=";
    value: "autoroute" | "tunnel" | "pont";
  };

  PgrConstraint:
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

  ItineraireRequest: {
    /**
     * bdtopo-osrm : il permet des
     * performances de calcul élevées mais présente un choix limité dans le paramétrage
     * des requêtes notamment pour les l’expression des contraintes
     *
     * bdtopo-valhalla : il présente les mêmes avantages et inconvénients qu'OSRM, mais
     * avec des performances un peu moindres. Nous vous conseillons de plutôt utiliser
     * les ressources OSRM
     *
     * bdtopo-pgr (pgRouting) : il permet un plus grand choix dans le paramétrage des
     * requêtes notamment pour l’expression des contraintes et pour la récupération
     * d'attributs issus de la BD TOPO®. Cependant, les performances de calcul de ce
     * moteur sont très inférieures à celles d'OSRM et Valhalla, nous vous conseillons
     * donc de choisir de manière préférentielle OSRM, et de n'opter pour pgRouting
     * que si vous avez des besoins précis concernant les contraintes de calcul et/ou
     * les attributs récupérés.
     *
     * La ressource bdtopo-iso disparaît au profit de la ressource bdtopo-valhalla
     */
    resource: "bdtopo-osrm" | "bdtopo-valhalla" | "bdtopo-pgr";

    /**
     * format: "{lon},{lat}"
     * exemple: "6.4978,46.0918"
     */
    start: string;
    end: string;

    /**
     * format requête GET  : "{lon1},{lat1}|{lon2},{lat2}"
     * format requête POST : ["{lon1},{lat1}", "{lon2},{lat2}"]
     */
    intermediates?: string | string[];

    /**
     * Valeur par défaut : "car" avec pgr
     *                     "pedestrian" avec osmr
     */
    profile?: "car" | "pedestrian";

    /**
     * au plus court / au plus rapide
     * Valeur par défaut : "fastest" avec pgr
     *                     "shortest" avec osmr
     */
    optimization: "shortest" | "fastest";

    /**
     * Permet de préciser si la réponse du service doit comporter ou non le détail
     * de l’itinéraire tronçon par tronçon. Si ce n’est pas le cas l’itinéraire est
     * retourné avec une géométrie globale simplifiée et ses caractéristiques générales
     * (durée et distance totales)
     * Valeur par défaut : "true"
     */
    getSteps?: "true" | "false";

    /**
     * Permet de préciser (lorsque le paramètre « getSteps » vaut « true »), les caractéristiques
     * des tronçons que l’on veut avoir dans la réponse. La liste des attributs
     * disponibles varie selon la ressource choisie. Elle est disponible dans les capacités
     * du service.
     *
     * bdtopo-osrm : "name"
     * bdtopo-valhala : "name"
     * bdtopo-pgr : "name"|"insee_commune_droite"|"restriction_de_poids_par_essieu"|"nature"|"importance"|"insee_commune_gauche"|"acces_pieton"|"bande_cyclable"|"nombre_de_voies"|"restriction_de_poids_total"|"position_par_rapport_au_sol"|"urbain"|"restriction_de_hauteur"|"itineraire_vert"|"cleabs"|"sens_de_circulation"|"vitesse_moyenne_vl"|"cpx_numero"|"cpx_classement_administratif"|"cpx_gestionnaire"|"cpx_toponyme_route_nommee"|"acces_vehicule_leger"|"nom_1_gauche"|"largeur_de_chaussee"|"nature_de_la_restriction"|"cpx_numero_route_europeenne"|"reserve_aux_bus"|"matieres_dangereuses_interdites"|"restriction_de_largeur"|"nom_1_droite"|"restriction_de_longueur"
     *
     * on peut définir jusqu'à 10 attributs
     */
    waysAttributes?: string[];

    /**
     * Valeur par défaut : "geojson"
     */
    geometryFormat?: "geojson" | "polyline" | "wkt";

    /**
     * Valeur par défaut : "EPSG:4326"
     */
    crs?: "EPSG:4326" | "EPSG:2154";

    /**
     * Permet de préciser l’unité dans laquelle les durées sont exprimées dans la réponse
     * Valeur par défaut : "second"
     */
    timeUnit?: "hour" | "minute" | "second";

    /**
     * Valeur par défaut : "meter"
     */
    distanceUnit?: "meter" | "kilometer";

    /**
     * Renvoie l'emprise de l'itinéraire dans la réponse.
     * Valeur par défaut : "true"
     */
    getBbox?: "true" | "false";

    /**
     * On peut définir jusqu'à 3 contraintes
     */
    constraints?: (APISchemas["OsrmConstraint"] | APISchemas["PgrConstraint"])[];
  };

  ItineraireResponse: {
    resource: "bdtopo-osrm" | "bdtopo-valhalla" | "bdtopo-pgr" | "bdtopo-iso";
    resourceVersion: string;

    start: string;
    end: string;

    profile: "car" | "pedestrian";

    optimization: "shortest" | "fastest";

    /**
     * depending on geometryFormat
     *    - polyline : return Google encoded string
     *    - geojson : return LineString.
     *    - wkt : return PostGIS wkt ex: "LINESTRING(2.301943 48.818711,2.301937 48.8187,...)"
     */
    geometry: string | LineString;

    crs: "EPSG:4326" | "EPSG:2154";

    timeUnit: "hour" | "minute" | "second";
    distanceUnit: "meter" | "kilometer";

    /**
     * only if getBbox is not set or true
     */
    bbox?: [number, number, number, number];

    /* Format: float */
    distance: number;

    /* Format: float */
    duration: number;

    constraints?: (APISchemas["OsrmConstraint"] | APISchemas["PgrConstraint"])[];

    portions: {
      start: string;
      end: string;
      /* Format: float */
      duration: number;
      /* Format: float */
      distance: number;

      /**
       * only if getBbox is not set or true
       */
      bbox?: [number, number, number, number];

      /**
       * retourne un tableau vide si getSteps est à "false"
       */
      steps: {
        geometry: string;
        duration: number;
        distance: number;

        /* définis par waysAttributes */
        attributes: {
          /**
           * avec bdtopo-osrm / bdtopo-valhalla
           * l'utilisation des wayAttributes n'est pas adaptée
           * les 4 champs sont enveloppés dans un champ name
           */
          name: {
            nom_1_gauche: string;
            nom_1_droite: string;
            cpx_numero: string;
            cpx_toponyme: string;
          };

          /** avec bdtopo-pgr nous avons les 4 champs tout le temps*/
          nom_1_gauche: string;
          nom_1_droite: string;
          cpx_numero: string;
          cpx_toponyme_route_nommee: string;

          /** avec en plus les champs définis dans wayAttributes */
          name: string;
        };

        /**
         * Seulement défini avec bdtopo-osrm / bdtopo-valhalla
         * objet vide avec bdtopo-pgr
         */
        instruction: {
          type: string | "depart" | "arrive" | "turn" | "new name" | "end of road";
          modifier?: string | "right" | "slight right" | "left" | "slight left" | "straight";
        };
        // alerts?: Array<{ message?: string }>;
      }[];
    }[];
  };

  IsochroneRequest: {
    /**
     * format: "{lon},{lat}"
     * exemple: "6.4978,46.0918"
     */
    point: string;

    /**
     * comme pour les itinéraires sauf que la ressource "bdtopo-osrm" n'est pas disponible
     */
    resource: "bdtopo-valhalla" | "bdtopo-pgr";

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

    constraints?: (APISchemas["OsrmConstraint"] | APISchemas["PgrConstraint"])[];

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
    constraints?: (APISchemas["OsrmConstraint"] | APISchemas["PgrConstraint"])[];
    geometry: Polygon;
  };
};

export type APIEndpoints = {
  "/navigation/itineraire": {
    responses: {
      get: APISchemas["ItineraireResponse"];
      post: APISchemas["ItineraireResponse"];
    };
    requests:
      | {
          method?: "get";
          query: APISchemas["ItineraireRequest"];
        }
      | {
          method: "post";
          body: APISchemas["IsochroneRequest"];
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
