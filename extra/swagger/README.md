Pour voir les swaggers associés aux API

```bash
# la première fois
pnpm build

# puis
pnpm swagger
```

IGN complétion
https://geoservices.ign.fr/documentation/services/api-et-services-ogc/geocodage-20/doc-technique-api-autocompletion



## export ts

```bash
pnpm generate
```


## Schema Object

```ts
const Schema: NodeType = {
  properties: {
    externalDocs: 'ExternalDocs',
    discriminator: 'Discriminator',
    title: { type: 'string' },
    multipleOf: { type: 'number', minimum: 0 },
    maximum: { type: 'number' },
    minimum: { type: 'number' },
    exclusiveMaximum: { type: 'boolean' },
    exclusiveMinimum: { type: 'boolean' },
    maxLength: { type: 'number', minimum: 0 },
    minLength: { type: 'number', minimum: 0 },
    pattern: { type: 'string' },
    maxItems: { type: 'number', minimum: 0 },
    minItems: { type: 'number', minimum: 0 },
    uniqueItems: { type: 'boolean' },
    maxProperties: { type: 'number', minimum: 0 },
    minProperties: { type: 'number', minimum: 0 },
    required: { type: 'array', items: { type: 'string' } },
    enum: { type: 'array' },
    type: {
      enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'],
    },
    allOf: listOf('Schema'),
    anyOf: listOf('Schema'),
    oneOf: listOf('Schema'),
    not: 'Schema',
    properties: 'SchemaProperties',
    items: (value: any) => {
      if (Array.isArray(value)) {
        return listOf('Schema');
      } else {
        return 'Schema';
      }
    },
    additionalProperties: (value: any) => {
      if (typeof value === 'boolean') {
        return { type: 'boolean' };
      } else {
        return 'Schema';
      }
    },
    description: { type: 'string' },
    format: { type: 'string' },
    default: null,
    nullable: { type: 'boolean' },
    readOnly: { type: 'boolean' },
    writeOnly: { type: 'boolean' },
    xml: 'Xml',
    example: { isExample: true },
    deprecated: { type: 'boolean' },
  },
};
```



## Traitement manuel de transformation des fichiers OpenAPI en fichiers de déclaration de type TypeScript

Utilisation du package `@grafikart/o2ts`.

### `ign-geocodage.yaml`

récupéré le yaml OpenAPI : https://geoservices.ign.fr/documentation/services/services-geoplateforme/geocodage
https://data.geopf.fr/geocodage/openapi.yaml

retiré les références à GetCapabilities. génération du fichier `./export/api-geocodage.d.ts`

```bash
pnpm run generate-ign-geocodage
```

ce fichier est ensuite nettoyé manuellement et réinjecté dans `packages/pentatrion-geo/ign/api-geocodage.d.ts`
