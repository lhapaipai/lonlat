type MyExpand<T> = T extends Array<infer U>
  ? Array<Expand<(U extends infer S ? [S] : [never])[0]>>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
