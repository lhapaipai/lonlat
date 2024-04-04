export interface Event<T> {
  readonly type: string;
  target: T;
}

export interface LngLatObj {
  lng: number;
  lat: number;
}
