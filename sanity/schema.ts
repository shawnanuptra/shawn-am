import { type SchemaTypeDefinition } from "sanity";
import { blogType } from "./schemaTypes/blogType";
import { projectType } from "./schemaTypes/projectType";
import { todayILearnedType } from "./schemaTypes/todayILearnedType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [projectType, blogType, todayILearnedType],
};
