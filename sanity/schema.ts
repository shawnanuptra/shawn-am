import { type SchemaTypeDefinition } from "sanity";
import { blogType } from "./schemaTypes/blogType";
import { projectType } from "./schemaTypes/projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [projectType, blogType],
};
