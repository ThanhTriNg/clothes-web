import { Button } from "@/components/ui/button";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { addClothesThunk } from "@/redux/reducer/Clothes";
import { addClothesProps } from "@/redux/module";
const Add = () => {
  const [formData, setFormData] = useState<addClothesProps>({
    categoryId: "",
    genderId: "",
    name: "",
    price: 0,
    desc_sort: "",
    desc: "",
    img: {
      main: "",
      sub: [""],
    },
  });
  const [base64Image, setBase64Image] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBase64Image(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here, for example, send formData to a server
    console.log("Form submitted:", formData);
    // dispatch(addClothesThunk(formData));
  };

  return (
    <div>
      <h1 className="uppercase font-bold text-2xl">Add clothes</h1>

      <form
        className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* <label className="block mb-4">
          <span className="text-gray-700">ID:</span>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label> */}

        <label className="block mb-4">
          <span className="text-gray-700">Category ID:</span>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Gender ID:</span>
          <input
            type="text"
            name="genderId"
            value={formData.genderId}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
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
        <label className="block mb-4">
          <span className="text-gray-700">Image:</span>
          <input type="file" onChange={handleImageChange}  value={formData.img.main}/>
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
