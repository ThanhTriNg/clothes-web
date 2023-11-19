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

export interface Categories {
  id: string;
  name: string;
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
