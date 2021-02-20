import { convert, resolveRefs, stripSchema, supportedTextCases } from './converter';

// NodeJS: Export types and utility functions
export * from './interfaces';
export {
    supportedTextCases,
    resolveRefs,
    stripSchema,
    convert
}

// Browser: Inject `SchemaConverter` in Window object
const globalAny:any = global;
globalAny.SchemaConverter = {
    supportedTextCases,
    resolveRefs,
    stripSchema,
    convert
};
