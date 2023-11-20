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

export interface CategoriesProps {
  id: string;
  name: string;
  group: number;
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
