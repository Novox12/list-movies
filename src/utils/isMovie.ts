import type { Movie } from "../interfaces";

export const isMovie = (obj: any): obj is Movie => {
	return (
		typeof obj === 'object' &&
		typeof obj.title === 'string' &&
		typeof obj.date === 'string' &&
		typeof obj.img === 'string'
	);
}