export type APISchemas = {
  InterpreterRequest: {
    data: string;
  };

  InterpreterResponse: {
    version: number;
    generator: string;
    osm3s: {
      [key: string]: string;
    };
    elements: APISchemas["Element"][];
  };

  Element:
    | APISchemas["NodeElement"]
    | APISchemas["WayElement"]
    | APISchemas["RelElement"]
    | APISchemas["AreaElement"];

  NodeElement: {
    type: "node";
    id: number;
    lat: number;
    lon: number;
    tags: {
      // name?: string;
      // natural?: string;
      // place?: string;
      // ele?: string;
      [key: string]: string;
    };
  };

  WayElement: {
    type: "way";
    id: number;
    nodes: number[];
    tags: {
      [key: string]: string;
    };
  };

  RelElement: {
    type: "relation";
    id: number;
    members: APISchemas["RelMember"][];
  };

  AreaElement: {
    type: "area";
    id: number;
    tags: {
      [key: string]: string;
    };
  };

  RelMember: {
    type: "node" | "way" | "relation";
    ref: number;
    role: "inner" | "outer";
  };
};

export type APIEndpoints = {
  "/api/interpreter": {
    responses: {
      post: APISchemas["InterpreterResponse"];
    };
    requests: {
      method: "post";
      body: APISchemas["InterpreterRequest"];
    };
  };
};

export type APIPaths = keyof APIEndpoints;

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"];

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>;

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
