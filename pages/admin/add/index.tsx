import { AddClothesProps, GetSubCateProps } from "@/redux/module";
import {
  getCategoriesThunk,
  getSubCateByCategoryIdThunk,
} from "@/redux/reducer/Categories";
import { addClothesThunk } from "@/redux/reducer/Clothes";
import { getGenderThunk } from "@/redux/reducer/Gender";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Add = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<AddClothesProps>({
    categoryId: "1",
    subCategoryId: "1",
    genderId: "1",
    name: "",
    price: 0,
    desc_sort: "",
    desc: "",
    img: {
      main: "",
      sub: [],
    },
  });
  const subCate: GetSubCateProps = {
    subName: "",
    categoryId: "",
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData: any) => ({
          ...prevData,
          img: { ...prevData.img, main: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const subImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          subImages.push(reader.result as string);

          if (subImages.length === files.length) {
            setFormData((prevData) => ({
              ...prevData,
              img: { ...prevData.img, sub: subImages },
            }));
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, categoryId: e.target.value }));
  };
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, genderId: e.target.value }));
  };
  const handleSubCateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, subCategoryId: e.target.value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here, for example, send formData to a server
    // console.log(formData);
    dispatch(addClothesThunk(formData));
  };

  const { categoriesInfo, menSubCateInfo, womenSubCateInfo, subCateByIdInfo } =
    useSelector((state: RootState) => state.categories);
  const { genderInfo } = useSelector((state: RootState) => state.gender);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getGenderThunk());

    // dispatch(getSubCateByCategoryIdThunk({ subName: "men", categoryId: "1" }));
  }, [dispatch]);
  // console.log(subCateByIdInfo);
  useEffect(() => {
    subCate.categoryId = formData.categoryId;
    if (formData.genderId === "1") {
      subCate.subName = "women";
    } else if (formData.genderId === "2") {
      subCate.subName = "men";
    }

    dispatch(getSubCateByCategoryIdThunk(subCate));
  }, [dispatch, formData.categoryId, formData.genderId]);
  return (
    <div>
      <h1 className="uppercase font-bold text-2xl">Add clothes</h1>

      <form
        className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Gender */}
        <label className="block mb-4">
          <span className="text-gray-700">Gender:</span>
          <select
            name="genderId"
            value={formData.genderId}
            onChange={handleGenderChange}
          >
            {genderInfo &&
              genderInfo.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
          </select>
        </label>
        {/* Category */}
        <label>
          Category:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleCategoryChange}
          >
            {categoriesInfo &&
              categoriesInfo.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </label>
        {/* Sub-categories */}
        <label className="block mb-4">
          <span className="text-gray-700">Sub categories:</span>
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleSubCateChange}
          >
            {subCateByIdInfo &&
              subCateByIdInfo.map((item, idx: number) => {
                return (
                  <option key={`${item.categoryId}-${idx}`} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>

          {/* <select name="">
            <option value="1">So 1</option>
            <option value="2">So 2</option>
            <option value="3">So 3</option>
          </select> */}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Description (Short):</span>
          <input
            type="text"
            name="desc_sort"
            value={formData.desc_sort}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="form-textarea mt-1 block w-full"
          />
        </label>
        <label>
          Main Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Thumbnail Images:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleSubImageChange}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
