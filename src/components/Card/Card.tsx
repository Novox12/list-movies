import styled from "./Card.module.css"
import type { PropsCard } from "../../interfaces";
import { RiCloseFill } from "react-icons/ri";


export const Card = ({ data, actionSelect, actionDelete, className }: PropsCard) => {



	return (
		<div className={`${styled.card} ${className || ''}`}>
			<div onClick={actionDelete} className={styled.btnDelete}>
				<RiCloseFill color="#a82423" size={15} />
			</div>
			<img onClick={actionSelect} src={data.img} alt="" />
			<h3>{data.title}</h3>
			<p>{data.date}</p>
		</div>
	)
}