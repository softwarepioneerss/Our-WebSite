type User = {
	email: string;
	password: string;
};

type responseCallback = {
	data: any;
	error: any;
};

export type { User, responseCallback };
