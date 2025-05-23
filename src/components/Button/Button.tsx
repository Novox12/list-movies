import type { PropsButton } from "../../interfaces"
import styled from "./Button.module.css"

export const Button =({text, action=null}:PropsButton)=>{

	return (
		<button 
			{...(action ? { onClick: action } : {})}
			className={styled.btn}
		>
			{text}
		</button>
	)
}