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
    description?: string;
    subCategoryId?: number;
    Sub_Category: SubCateInClothesProps;
    imageUrl: string;
    subImageUrls?: any;
    sizes?: string;
    colors?: string;
    isDeleted?: boolean;
}
export interface ClothesProps {
    data: ClothesPropsData[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
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

export interface CartItemProps {
    product: ClothesPropsData;
    qty: number;
    size: string;
    color: string;
}

export interface UserAuthProps {
    email: string;
    password: string;
}
export interface UserProps {
    id?: number;
    lName?: string;
    fName?: string;
    email?: string;
    password?: string;
    avatar?: string;
    roleCode?: string;
    address?: string;
    phone?: string;
}
export interface CateApiProps {
    name: string;
    gender: string;
}
export interface OrderProps {
    product: {
        id: string;
        product: string;
        price: number;
        imageUrl: string;
    };
    quantity: string;
    size: string;
    color: string;
}

export interface CartItemDbProps {
    id: number;
    cartId: number;
    size: string;
    color: string;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface CartDbProps {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    Cart_items: CartItemDbProps[];
}

export interface ClothesDataTable {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}
