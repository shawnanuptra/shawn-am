import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./schemaTypes/projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectType],
};
