import { IConfigResolved } from '../interfaces';

export abstract class BaseFormatter {
    abstract typeMap: Map<string, string>;
    abstract format(): string[];
    abstract config(): IConfigResolved;
}
