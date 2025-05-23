import type { Movie } from "../interfaces";
import { isMovie } from "./isMovie";

export const loadMovies =(): Movie[] => {
	const data = localStorage.getItem('listMoviesData');
	if (!data) return [];

	try {
		const parsed = JSON.parse(data);
		if (Array.isArray(parsed) && parsed.every(isMovie)) {
			return parsed;
		} else {
			console.warn('Datos mal formateados en localStorage');
			return [];
		}
	} catch (e) {
		console.error('Error al parsear JSON:', e);
		return [];
	}
}