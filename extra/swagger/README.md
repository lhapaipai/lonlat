Pour voir les swaggers associés aux API

```bash
# la première fois
pnpm build

# puis
pnpm swagger
```

IGN complétion
https://geoservices.ign.fr/documentation/services/api-et-services-ogc/geocodage-20/doc-technique-api-autocompletion

IGN géocodage
https://geoservices.ign.fr/documentation/services/api-et-services-ogc/geocodage-20/doc-technique-api-geocodage


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


https://redocly.com/docs/openapi-visual-reference/schemas/

```
# format
type        format      Comments
integer 	int32 	    signed 32 bits
integer 	int64 	    signed 64 bits (a.k.a long)
number 	    float
number 	    double
string 	    password 	A hint to UIs to obscure input.
```

```yaml
key0:
  type: boolean
  default: false

key1:
  type: integer
  default: false
  example: 3
  minimum: 0
  maximum: 5
  format: int32
  title: À renseigner seulement si key1 ne suffit pas
  description: infos supplémentaires

key2:
  type: string
  # data types can have an optional modifier property: format
  format: email

key10:
  type: array
  items:
    - one
    - two
    - three

key11:
  type: string
  enum:
    - one
    - two
    - three

key3:
  type: object
  required:
    - name
  properties:
    name:
      type: string
    address:
      $ref: '#/components/schemas/Address'
    age:
      type: integer
      format: int32
      minimum: 0
      maximum: 99
  example:
    name: Peter
    address: London Bridge
    age: 40

# Model with Map/Dictionary Properties
key4:
  type: object
  additionalProperties:
    type: string

key5:
  allOf:
    - $ref: '#/components/schemas/ErrorModel'
    - type: object
      required:
        - rootCause
      properties:
        rootCause:
          type: string
```
