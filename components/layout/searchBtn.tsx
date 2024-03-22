import { getCategoriesThunk } from "@/redux/reducer/Categories";
import { getClothesByNameThunk } from "@/redux/reducer/Clothes";
import { AppDispatch, RootState } from "@/redux/store/Store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { convertNameCate } from "../LimitedPromotion";
import { Input } from "../ui/input";
import { CategoriesProps } from "@/redux/module";

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] =
    useState<string>("null");
    
  const { clothesByName, loadingClothesByName } = useSelector(
    (state: RootState) => state.clothes
  );
  const { categoriesInfo } = useSelector(
    (state: RootState) => state.categories
  );

  const dispatch = useDispatch<AppDispatch>();

  //debounce
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if (inputValue !== "") {
        setDebouncedInputValue(inputValue);
      } else {
        setDebouncedInputValue("null");
      }
    }, 400);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  useEffect(() => {
    setInputValue("");
  }, [router]);

  useEffect(() => {
    dispatch(getClothesByNameThunk(debouncedInputValue));
  }, [dispatch, debouncedInputValue]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="relative group">
        <div className=" relative flex justify-between items-center">
          {!inputValue && (
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 "
            />
          )}
          <Input type="text" onChange={handleInputChange} value={inputValue} />
          {loadingClothesByName && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              <ReactLoading
                type={"spin"}
                color="#0000ff80"
                height="18px"
                width="18px"
              />
            </div>
          )}
        </div>

        {categoriesInfo && clothesByName && clothesByName.length > 0 && (
          <div className="mt-2 shadow-md absolute w-[200%] bg-gray-50 p-3 -right-1/2 rounded-sm hidden group-focus-within:block">
            {clothesByName.map((item, idx: number) => {
              const category = findCategory(item.categoryId, categoriesInfo);
              const cateName = convertNameCate(category?.name as any);
              return (
                <div key={`cart-item-${idx}`} className="">
                  <Link href={`/store/${cateName}/detail/${item.id}`}>
                    <div className="grid grid-cols-4 p-2  items-center hover:bg-black/10 hover:cursor-pointer gap-x-3">
                      <Image
                        src={item.img.main}
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt=""
                        className="col-span-1 w-full  !mt-0"
                      />
                      <h1 className="col-span-2"> {item.name} </h1>
                      <h1 className="col-span-1  text-center">
                        {item.price}đ{" "}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

export const findCategory = (
  categoryId: string | undefined,
  categoriesInfo: CategoriesProps[] | null
) => {
  if (categoriesInfo) {
    return categoriesInfo.find((category) => category.id === categoryId);
  }
};
