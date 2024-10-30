import { createClient, QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";
export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
	perspective: "published",
});

// helper function that only caches for 30s in dev. in production, caches for an hour.
export async function sanityFetch<QueryResponse>({
	query,
	params = {},
	tags,
}: {
	query: string;
	params?: QueryParams;
	tags?: string[];
}) {
	return client.fetch<QueryResponse>(query, params, {
		next: {
			revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
			tags,
		},
	});
}
