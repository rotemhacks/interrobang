import { db } from '$lib/server/db';

export const load = async () => {
	const result = await db.query.volumes.findMany({
		with: {
			chapters: {
				orderBy: (chapters, { asc }) => [asc(chapters.chapnum)],
				with: {
					pages: {
						orderBy: (pages, { asc }) => [asc(pages.pagenum)]
					}
				}
			}
		}
	});

	result.sort((a, b) => a.volnum - b.volnum);

	return {
		volumes: result
	};
};
