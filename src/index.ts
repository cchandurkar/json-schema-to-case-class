import { IConfig, ICaseClassDef } from './types';
import { Config } from './config';

import get from 'lodash/get';
import map from 'lodash/map';

import * as changeCase from 'change-case';
import $RefParser from '@apidevtools/json-schema-ref-parser';

import { format as scalaFormat } from './formatters/scala-case-class';

export const typeMap = {
  'integer':  'Integer',
  'string':   'String',
  'number':   'Double',
  'boolean':  'Boolean',
  'array':    'List',
  'object':   'Any'
};

async function validate( schema ) {
  console.assert( schema.properties, 'Required field not found or null: "properties"' );
  return true;
}

/**
 * This function basically converts the JSON Schema into simplified data format
 * which can be used by other formatters.
 *
 * @param schema
 * @param config
 */
export async function convert( schema: any, config: IConfig ): Promise<string> {
  return validate( schema )
      .then( () => resolveRefs( schema ) )
      .then( res => stripSchema( res.schema, config) )
      .then( res => format( res, config ) )
}

/**
 * This function basically strips the JSON Schema into simplified format
 * which can be used by formatter(s).
 *
 * @param schema
 * @param config
 */
export async function stripSchema( schema: any, config: IConfig ){
  config = Config.resolve(config);
  return await stripSchemaObject(schema, 1, config.topLevelCaseClassName, config );
}

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
export async function resolveRefs(schema: any ){
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
 * @param entityTitle - Used for case class name if 'title' field is not provided.
 * @param config - configuration instance.
 */
export function stripSchemaObject(schemaObject: any, currentDepth: number, entityTitle: string, config: IConfig ) : ICaseClassDef {

  // Use schema object 'title' field to derive case class name.
  // For nested properties, use the object 'key' as case class name.
  // For top-level case class it will use `caseClassName` if 'title' field is not provided.
  let schemaObjectTitle = get( schemaObject, 'title', entityTitle );
  let entityName = changeCase[ config.classNameTextCase ].call( changeCase, schemaObjectTitle );
  let entityDescription = get( schemaObject, 'description' );
  let requiredParams = get(schemaObject, 'required', []);

  // Transform every parameter of this schema object
  let parameters = map( schemaObject.properties, ( paramObject, key ) => {

    // Get and convert case class parameter's name, type and description
    let paramName = config.classParamsTextCase !== 'defaultCase' ? changeCase[ config.classParamsTextCase ].call( changeCase, key ) : key;
    let paramType =  get(typeMap, paramObject.type, config.defaultGenericType);
    let description = paramObject.description;

    // For nested objects, use parameter name as
    // case class name ( if title property is not defined )
    let nestedObject: ICaseClassDef;
    if( config.maxDepth === 0 || currentDepth < config.maxDepth ){
      if(paramObject.type === 'object'){
        nestedObject = stripSchemaObject( paramObject, currentDepth + 1, paramName, config );
        paramType = nestedObject.entityName;
      } else if( paramObject.type === 'array' ){
        if( paramObject.items.type !== "object" ){
          let arrayItemType = get(typeMap, paramObject.items.type, config.defaultGenericType);
          paramType = paramType + `[${arrayItemType}]`;
        } else {
          nestedObject = stripSchemaObject( paramObject.items, currentDepth + 1, paramName, config );
          paramType = paramType + `[${nestedObject.entityName}]`;
        }
      }
    } else {
      if( paramObject.type === 'object' ){
        paramType = config.defaultGenericType;
      } else {
        paramType += `[${config.defaultGenericType}]`;
      }
    }

    // Parameter level data
    return {
      isRequired: requiredParams.includes(key),
      paramName,
      paramType,
      description,
      nestedObject
    };

  });

  // Return parsed result for this schema object
  return {
    entityName,
    entityDescription,
    parameters
  };

}


export async function format( strippedSchema: ICaseClassDef, config: IConfig ): Promise<string> {
  return await scalaFormat(strippedSchema, config);
}
