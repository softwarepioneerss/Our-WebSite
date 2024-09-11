import type { User, responseCallback } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user: User = locals.user;
	if (Object.keys(user).length > 0) {
		return {
			user
		};
	} else {
		return {
			user: null
		};
	}
};
