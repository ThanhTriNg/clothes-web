export interface AddClothesProps {
  name: string;
  price: string;

  imageUrl: any;
  subImageUrls: any;

  // gender: string;
  // stock: string;
  descriptionSort: string;
  description: string;
  subCategoryId: string;
  // sizes: string;
  // colors: string;
}

export interface ClothesPropsData {
  id: number;
  name: string;
  gender?: string;
  stock?: number;
  price: number;
  descriptionSort?: string;
  description: string;
  subCategoryId?: number;
  Sub_Category: SubCateInClothesProps;
  imageUrl: string;
  subImageUrls?: any;
  sizes?: string;
  colors?: string;
}
export interface SubCateInClothesProps {
  id: number;
  name: string;
  categoryId: number;
  Categories: {
    id: number;
    name: string;
  }[];
}
export interface ClothesProps {
  data: ClothesPropsData[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CategoriesProps {
  id: number;
  name: string;
  Sub_Categories: {
    id: number;
    name: string;
  }[];
  gender: string;
}

export interface apiResponse {
  err: number;
  message: string;
  data: CategoriesProps[];
}
export interface GetSubCateProps {
  subName: string;
  categoryId: string;
}

export interface SubCateProps {
  id: number;
  name: string;
  categoryId: number;
}

export interface CartItem {
  product: ClothesPropsData;
  qty: number;
  size: string;
  color:string;
}

export interface UserProps {
  email: string;
  password: string;
}
export interface CateApiProps {
  name: string;
  gender: string;
}
