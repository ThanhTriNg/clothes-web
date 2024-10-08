import { CategoriesProps, SortValueType } from '@/redux/module';

export interface ProductProps {
    id: string;
    name: string;
    img: string;
    price: number;
}
export interface ProductDetailSlideProps {
    thumbnail: {
        imageUrl: string;
        subImageUrls?: string[];
    };
    description?: string;
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
    categoryArr?: CategoriesProps[];
}
export interface listItemProps {
    href: string;
    name: string;
}
export interface TextFilterType extends SortValueType {
    label: string;
    value?: string;
}
export interface ComboBoxProps {
    textFilters: TextFilterType[];
}

export interface SlideShowProps {
    listImg?: any;
    className?: string;
}
