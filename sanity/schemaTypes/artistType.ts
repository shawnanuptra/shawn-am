import { defineField, defineType } from "sanity";

export const artistType = defineType({
    name: "artist",
    title: "artist",
    type: "document",
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
    ],
});
