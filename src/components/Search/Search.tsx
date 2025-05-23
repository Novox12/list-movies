import type { SearchProps } from "../../interfaces"
import styled from  "./Search.module.css"
import { FiSearch } from "react-icons/fi"



export const Search=({ onSearch }: SearchProps)=>{

	return (
		
		<div className={styled.container}>
			<input className={styled.searchInput} type="text" placeholder="Search movie..." onChange={(e) => onSearch(e.target.value)} />
			<FiSearch className={styled.iconSearch} />
		</div>
		
	)

}