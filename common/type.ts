export interface ProductProps {
  id: string;
  name: string;
  img: string;
  price: number;
}
export interface ProductDetailSlide {
  // thumbnail: {
  //   img: string;
  // }[];
  thumbnail: {
    main: string;
    sub?: string[];
  };
}
//ko xai
export interface ProductCardProps {
  id: string;
  img: string;
  name: string;
  price: number;
  colors: string[];
}
export interface PickSizeProps {
  colors: string[];
  size?: number;
  spaceBetween?: number;
  showName?: boolean;
}
export interface ProductNavProps {
  className?: string;
}
export interface listItemProps {
  href: string;
  name: string;
}
export interface TextFilter {
  value?: string;
  label: string;
}
export interface ComboBoxProps {
  textFilters: TextFilter[];
}

export interface SlideShowProps {
  listImg?: any;
  className?: string;
}
