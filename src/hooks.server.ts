import { redirect } from '@sveltejs/kit';
import type { User, responseCallback } from '$lib/types';

export async function handle({ event, resolve }) {
	if (event.url.pathname.includes('/login')) {
		return resolve(event);
	}

	const userCookie = event.cookies.get('user');
	let user: User;
	if (userCookie) {
		try {
			user = JSON.parse(userCookie);
			const response = await fetch(`${event.url.origin}/api/login`, {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'content-type': 'application/json'
				}
			});
			const responseCallback: responseCallback = await response.json();

			if (responseCallback.error === null && responseCallback.data) {
				event.locals.user = user;
				return resolve(event);
			} else {
				throw redirect(303, '/login');
			}
		} catch (error) {
			console.error('Invalid JSON in user cookie:', error);
			throw redirect(303, '/login');
		}
	} else {
		throw redirect(303, '/login');
	}
}
