import { defineField, defineType } from "sanity";

export const blogType = defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "series",
            type: "string",
            options: {
                list: [
                    { title: "Junior Dev Diary", value: "Junior Dev Diary" },
                ],
            },
        }),
        defineField({
            name: "entry",
            type: "number",
        }),
        defineField({
            name: "publishedAt",
            type: "datetime",
        }),
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: { source: "title" },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "thumbnail",
            type: "image",
            // validation: (rule) => rule.required(),
        }),
        defineField({
            name: "markdownContent",
            type: "markdown",
        }),
    ],
});
