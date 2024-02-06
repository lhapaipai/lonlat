export type ApiResource = {
  "@id": string;
  "@type": string;
};

export interface ApiCollection<T> extends ApiResource {
  "@context": string;
  "hydra:totalItems": number;
  "hydra:member": T[];

  "hydra:view"?: Pagination;
  "hydra:search"?: Search;
}

export interface Pagination {
  "@id": string;
  type: string;
  "hydra:first"?: string;
  "hydra:previous"?: string;
  "hydra:next"?: string;
  "hydra:last"?: string;
}

export interface Search {
  "@type": string;
  "hydra:template": string;
  "hydra:variableRepresentation": string;
  "hydra:mapping": {
    "@type": string;
    variable: string;
    property: string;
    required: true;
  }[];
}
