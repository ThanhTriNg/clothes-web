import { CategoriesProps } from "@/redux/module";

export interface menuProps {
  className?: string;
  menCate: CategoriesProps[];
  womenCate: CategoriesProps[];
  genderInfo: {
    name: string;
  }[];
}
