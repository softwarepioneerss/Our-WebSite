import type { User, responseCallback } from '$lib/types';

export const actions = {
	default: async ({ request, url, cookies }) => {
		const formData: FormData = await request.formData();
		const user: User = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		};

		const response: Response = await fetch(`${url.origin}/api/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json'
			}
		});
		const responseCallback: responseCallback = await response.json();

		if (responseCallback.error === null && responseCallback.data) {
			cookies.set('user', JSON.stringify(user), {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
		}

		return {
			responseCallback
		};
	}
};
