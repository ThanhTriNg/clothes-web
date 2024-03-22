export interface AddClothesProps {
  categoryId: string;
  subCategoryId: string;
  genderId: string;
  name: string;
  price: number;
  desc_sort: string;
  desc: string;
  img: {
    main: string;
    sub: string[];
  };
}
export interface ClothesProps {
  id: string;
  name: string;
  price: number;
  desc_sort?: string;
  desc?: string;
  genderId?: string;
  subCategoryId?: string;
  categoryId?: string;
  img: {
    main: string;
    sub?: string[];
  };
  size?: string[];
  color: string[];
}
export interface CategoriesProps {
  id: string;
  name: string;
  group: number;
  data?: SubCateProps[];
}
export interface GetSubCateProps {
  subName: string;
  categoryId: string;
}

export interface SubCateProps {
  id: string;
  categoryId: string;
  name: string;
}

export interface CartItem {
  product: ClothesProps;
  qty: number;
}

export interface UserProps {
  email: string;
  password: string;
}
