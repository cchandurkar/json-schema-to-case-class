# json-schema-to-case-class
A library to convert complex JSON Schema to [Scala Case Classes](https://docs.scala-lang.org/tour/case-classes.html). Supports both NodeJs and Browser environments. 

![Build Status](https://github.com/cchandurkar/json-schema-to-case-class/actions/workflows/build-and-deploy.yml/badge.svg?branch=main)
[![npm version](https://badge.fury.io/js/json-schema-to-case-class.svg)](https://badge.fury.io/js/json-schema-to-case-class)
[![License](https://img.shields.io/npm/l/json-schema-to-case-class.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![PRs Welcome](https://img.shields.io/badge/$-support-green.svg?style=flat-square)](https://github.com/sponsors/cchandurkar)

#### [**Try Online Editor**](https://cchandurkar.github.io/json-schema-to-case-class/?q=3)
<a href="https://cchandurkar.github.io/json-schema-to-case-class/?q=3" target="_blank"><img src="https://cchandurkar.github.io/json-schema-to-case-class/assets/media/screenshot.png"></a>

 

### Example
<table width="100%">
<tr>
<th>
JSON Schema                             
</th>
<th>
Generated Scala Case Classes
</th>
</tr>
<tr>
<td>
<pre>
{
  "title": "Product",
  "type": "object",
  "required": [ "productId", "productName", "price" ],
  "properties": {
    "productId": { "type": "integer" },
    "productName": { "type": "string" },
    "price": { "type": "number" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" }
      }
    }
  }
}
</pre>
</td>
<td>
<pre>
case class Product (
   productId: Integer,
   productName: String,
   price: Double,
   tags: Option[List[String]],
   dimensions: Option[Dimensions]
)
</pre>
<pre>
case class Dimensions (
   length: Double,
   width: Double,
   height: Double
)
</pre>
</td>
</tr>
</table>

### Features
1. Resolve local as well as remote schema references.
2. Handle nested JSON schema objects.
3. Can wrap optional fields in `Option[]`.
4. Support constraint validations through assertion.
5. Generate scaladoc based on the `description` provided in JSON Schema.
6. Support various text cases for case class and parameter names.
7. Can default to provided generic type. (default `Any`) 
8. Can build `Enumeration` objects for properties with `enum` field.


### Installing
```npm install --save json-schema-to-case-class```

[![NPM](https://nodei.co/npm/json-schema-to-case-class.png?compact=true)](https://nodei.co/npm/json-schema-to-case-class/)

## Usage - Node

For NodeJs (TypeScript):
```typescript
import { convert, IConfig } from 'json-schema-to-case-class'

const mySchema: any = { ... };
const config: IConfig = { ... };  // <-- Optional

// With default configuration:
convert( mySChema )
  .then( result => console.log(result) )
  .catch( err => console.error(err) )

// With custom configuration:
convert( mySchema, config )
  .then( result => console.log(result) )
  .catch( err => console.error(err) )
```

For NodeJs (JavaScript):
```javascript
const { convert } = require('json-schema-to-case-class');
// OR
const SchemaConverter = require('json-schema-to-case-class');
SchemaConverter.convert( , );
```

### Polyfills
If you are building this for a use in browser, you will need to include the following pollyfills:
```
 http: require.resolve('http-browserify'),
 https: require.resolve('https-browserify'),
 stream: require.resolve('stream-browserify')
```
Check [webpack.config.js](https://github.com/cchandurkar/json-schema-to-case-class/blob/develop/webpack.config.js) for example configuration. 

## Usage - Prebuilt Bundle

For browser: If you are using the prebuild bundle, it has all the APIs under `SchemaConverter` global object:
```javascript
SchemaConverter.convert( mySchema, config )
```

## Configuration

It is optional to pass configuration object. Every configuration setting is optional as well. When not passed, default kicks-in.  `IConfig`:

| Name                  | Type    | Description                                                                                                                                                                                                                             | Default     |
|-----------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| maxDepth              | number  | Parses nested schema objects upto the depth = maxDepth. Pass 0 for no limit on depth.                                                                                                                                                   | 0           |
| optionSetting         | string  | Setting to wrap optional parameters in `Option[]`.<br>1. "useOptions" - Wrap optional parameters in `Option[]`<br>2. "useOptionsForAll" - Wrapp all parameters in `Option[]`<br>3. "noOptions" - Don't wrap any parameter in `Option[]` | useOptions  |
| classNameTextCase     | string  | Text case for case class title. Could be one of:<br>camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase                                                         | pascalCase  |
| classParamsTextCase   | string  | Text case for case class parameters. Could be one of above.                                                                                                                                                                             | snakeCase   |
| topLevelCaseClassName | string  | This config kicks-in only if top level schema object does not have 'title' property.                                                                                                                                                    | MyCaseClass |
| defaultGenericType    | string  | Case class parameter type when `type` information not available from the schema or if we are converting partial schema using `maxDepth` setting.                                                                                        | Any         |
| parseRefs             | boolean | Whether to resolve the local or remote schema references ($ref).                                                                                                                                                                        | true        |
| generateComments      | boolean | Whether to generate scaladoc-like comments for the case class generated.                                                                                                                                                                | false       |
| generateValidations   | boolean | Whether to generate validations in the form of assertions in case class body.                                                                                                                                                           | false       |
| generateEnumerations  | boolean | Whether to generate enumerations for `enum` fields. It generates an object extending scala's `Enumeration` class and use it in parameter type.                                                                                          | false       |

## Browser Support
This library supports recent versions of every major web browsers. Refer to the browserified build `dist/js2cc.min.js` that you can directly use in `<script />` tag of HTML page. It already bundles all the required polyfills. 

## Limitations
- Schema Compositions - It currently only supports `allOf`. Support for `anyOf` and `oneOf` will be added in future releases. 

## Contributing
All contributions, enhancements, and bug-fixes are welcome. Open an issue or create a pull request. 

## Building locally
1. Clone the repo <br />
`https://github.com/cchandurkar/json-schema-to-case-class.git`

2. Install Dependancies <br />
```npm install```

3. Setup development environment <br />
```npm run setup-dev-env```

3. Run the test <br />
```npm test```

4. Run eslint checks<br />
```npm run lint```

4. Run eslint checks and fix the errors <br />
```npm run lint:fix```
