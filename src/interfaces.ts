export interface Movie {
    title:string
    date:string
    img:string
}

export interface SearchProps {
  onSearch: (value: string) => void;
}

export interface PropsButton {
	text:string
	action?:(() => void)| null;
}

export interface PropsCard {
	data:Movie
	actionSelect:(() => void);
	actionDelete: (() => void);
	className:string
}