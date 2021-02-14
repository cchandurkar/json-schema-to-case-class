import { IConfig } from './types';
import { Config } from './config';

import get from 'lodash/get';
import map from 'lodash/map';

import * as changeCase from 'change-case';
import $RefParser from '@apidevtools/json-schema-ref-parser';


export const typeMap = new Map(Object.entries({
  'integer':  'Integer',
  'string':   'String',
  'number':   'Double',
  'boolean':  'Boolean',
  'array':    'List',
  'object':   'Any'
}));

/**
 * This function basically converts the JSON SChema into simplified data format
 * which can be used by other formatters.
 *
 * @param schema
 * @param config
 */
export async function convert( schema: any, config: IConfig ) {

  // Sanitize, use default if not provided
  config = Config.resolve(config);

  // Parse local/remote references
  if( config.parseRefs ){
    let parsedSchema = await parseRefs(schema);
    if( parsedSchema.error ) return { error: parsedSchema.error };
    else schema = parsedSchema.schema
  }

  // Start Converting
  let caseClassDef = parseSchemaObject( schema, 1, config.topLevelCaseClassName, config );

  // Update top level case class name, if any.
  if( config.topLevelCaseClassName ){
    caseClassDef.caseClassName = config.topLevelCaseClassName;
  }

  return caseClassDef;

}

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
export async function parseRefs( schema: any ){

  // return JsonRefs.resolveRefs(schema, { resolveCirculars: true })
  //   .then( result => { return { error: null, schema: result.resolved  } } )
  //   .catch( err => { return { error: err, schema: null } } );

  return $RefParser
    .dereference(schema, { dereference:{ circular: 'ignore' } } )
    .then( result => { return { error: null, schema: result  } } )
    .catch( err => { return { error: err, schema: null } } );
}

/**
 * Recursive function that traverses the nested JSON Schema
 * and generates the simplified version of it. Every level of the schema
 * becomes one case class.
 *
 * @param schemaObject - Schema object to parse.
 * @param currentDepth - Current depth of schema object being parsed.
 * @param caseClassTitle - Used mostly for top-level case class if 'title' field is not provided.
 * @param config - configuration instance.
 */
export function parseSchemaObject(schemaObject: any, currentDepth: number, caseClassTitle: string, config: IConfig ){

  // Use schema object 'title' field to derive case class name.
  // For nested properties, use the object 'key' as case class name.
  // For top-level case class it will use `caseClassName` if 'title' field is not provided.
  let schemaObjectTitle = get( schemaObject, 'title', caseClassTitle );
  let caseClassName = changeCase[ config.classNameTextCase ].call( changeCase, schemaObjectTitle );
  let caseClassDescription = get( schemaObject, 'description' );
  let requiredParams = get(schemaObject, 'required', []);

  // Transform every parameter of this schema object
  let parameters = map( schemaObject.properties, ( paramObject, key ) => {

    // Get and convert case class parameter's name, type and description
    let paramName = config.classParamsTextCase !== 'defaultCase' ? changeCase[ config.classParamsTextCase ].call( changeCase, key ) : key;
    let paramType =  get(typeMap, paramObject.type, config.defaultGenericType);
    let description = paramObject.description;

    // Parse nested object
    let nestedObject;
    if( config.maxDepth === 0 || currentDepth < config.maxDepth ){
      if(paramObject.type === 'object'){
        nestedObject = parseSchemaObject( paramObject, currentDepth + 1, paramName, config );
        paramType = nestedObject.caseClassName;
      } else if( paramObject.type === 'array' ){
        if( paramObject.items.type !== "object" ){
          let arrayItemType = get(typeMap, paramObject.items.type, config.defaultGenericType);
          paramType = paramType + `[${arrayItemType}]`;
        } else {
          nestedObject = parseSchemaObject( paramObject.items, currentDepth + 1, paramName, config );
          paramType = paramType + `[${nestedObject.caseClassName}]`;
        }
      }
    } else {
      if( paramObject.type === 'object' ){
        paramType = config.defaultGenericType;
      } else {
        paramType += `[${config.defaultGenericType}]`;
      }
    }

    // Wrap parameter types in option
    if( config.optionSetting === 'useOptions' )
      paramType = !requiredParams.includes(key) ? `Option[${paramType}]` : paramType;
    else if( config.optionSetting === 'useOptionsForAll' )
      paramType =  `Option[${paramType}]`;

    return {
      paramName,
      paramType,
      description,
      nestedObject
    };

  });

  // Return parsed result for this object
  return {
    caseClassName,
    caseClassDescription,
    parameters
  };

}
