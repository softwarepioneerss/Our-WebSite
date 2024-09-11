import type { RequestHandler } from './$types';
import type { responseCallback, User } from '$lib/types';
import type { AuthTokenResponsePassword } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/server/db/supabase';

export const POST: RequestHandler = async ({ request }) => {
	let responseCallback: responseCallback;
	try {
		const user: User = await request.json();
		if (!user || !user.email || !user.password) {
			throw error(404, 'Invalid request body');
		}

		const response: AuthTokenResponsePassword = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password
		});

		if (response.error !== null) {
			throw error(404, response.error.message);
		}

		responseCallback = {
			data: response.data.user ?? null,
			error: null
		};
		return json(responseCallback);
	} catch (err: any) {
		responseCallback = {
			data: null,
			error: err ?? null
		};
		return json(responseCallback);
	}
};
