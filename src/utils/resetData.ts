import movies from "./movies.json"

export const resetData =()=>{
	localStorage.setItem('listMoviesData', JSON.stringify(movies));
}