import { defineField, defineType } from "sanity";

export const todayILearnedType = defineType({
	name: "entries",
	title: "Today I Learned",
	type: "document",
	fields: [
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
			// validation: (rule) => rule.required(),
		}),
		defineField({
			name: "markdownContent",
			type: "markdown",
		}),
	],
});
