import { FaCalendar } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
    name: "event",
    title: "Event",
    type: "document",
    icon: FaCalendar,
    groups: [
        { name: "details", title: "Details" },
        { name: "editorial", title: "Editorial" },
    ],
    fields: [
        defineField({
            name: "name",
            type: "string",
            group: "details",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: { source: "name" },
            validation: (rule) =>
                rule.required().error("Required to generate website"),
            hidden: ({ document }) => !document?.name,
            group: "details",
        }),
        defineField({
            name: "eventType",
            type: "string",
            options: {
                list: ["in-person", "virtual"],
                layout: "radio",
            },
            group: "details",
        }),
        defineField({
            name: "date",
            type: "datetime",
            group: "details",
        }),
        defineField({
            name: "doorsOpen",
            description:
                "Number of minutes before the start time for admission",
            type: "number",
            initialValue: 60,
        }),
        defineField({
            name: "venue",
            type: "reference",
            to: [{ type: "venue" }],
            readOnly: ({ value, document }) =>
                !value && document?.eventType === "virtual",
            validation: (rule) =>
                rule.custom((value, context) => {
                    if (value && context?.document?.eventType == "virtual") {
                        return "Only in-person events can have venues";
                    }
                    return true;
                }),
        }),
        defineField({
            name: "headline",
            type: "reference",
            to: [{ type: "artist" }],
        }),
        defineField({
            name: "image",
            type: "image",
            group: ["details", "editorial"],
        }),
        defineField({
            name: "details",
            type: "array",
            of: [{ type: "block" }],
            group: ["details", "editorial"],
        }),
        defineField({
            name: "tickets",
            type: "url",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "headline.name",
            media: "image",
        },
    },
});
