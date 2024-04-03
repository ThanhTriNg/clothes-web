import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CategoriesProps } from "@/redux/module";
import { Gender } from "@/redux/reducer/Gender";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import TabCustom from "./TabCustom";
interface DrawerMenuProps {
  className?: string;
  womenCate: CategoriesProps[];
  menCate: CategoriesProps[];
  genderInfo: Gender[] | null;
}
const DrawerMenu = ({
  className,
  womenCate,
  menCate,
  genderInfo,
}: DrawerMenuProps) => {
  // const { saveCateMen, saveCateWomen } = useSelector(
  //   (state: RootState) => state.categories
  // );
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  const router = useRouter();

    useEffect(() => {
      if (isOpen === true) {
        setIsOpen(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

  return (
    <div className={`${className}`}>
      <Drawer direction="right" onOpenChange={setIsOpen} open={isOpen}>
        <DrawerTrigger>
          <List size={24} />
        </DrawerTrigger>
        <DrawerContent className="overflow-y-scroll overflow-x-hidden max-h-[100vh]">
          <Tabs defaultValue="genderInfo-0" >
            <TabsList className="w-full bg-white ">
              {/* <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger> */}
              {genderInfo?.map((genderInfoItem, idx) => {
                return (
                  <TabsTrigger
                    key={`genderInfo-${idx}`}
                    value={`genderInfo-${idx}`}
                    className="w-full text-black data-[state=active]:text-white data-[state=active]:bg-primary"
                  >
                    {genderInfoItem.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabCustom
              value="genderInfo-0"
              data={womenCate}
            />
            <TabCustom
              value="genderInfo-1"
              data={menCate}
            />
          </Tabs>
          <DrawerClose className="flex justify-center py-6">
            <X size={28} />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;

// {genderInfo?.map((genderItem, idx: number) => {
//   let cate;
//   if (genderItem.name === "Nữ") {
//     cate = womenCate;
//   } else {
//     cate = menCate;
//   }
//   return (
//     <div key={`menu-${idx}`}>
//       {/* {cate?.map((cateItem, idx) => {
//         const data = cateItem.data;
//         const cateName = convertNameCate(cateItem.name);
//         return (
//           <div key={`item-${genderItem.name}-${idx}`}>
//             <DrawerHeader key={`menu-${idx}`}>
//               <DrawerTitle> {cateItem.name} </DrawerTitle>
//               {data?.map((dataItem, idx: number) => {
//                 return (
//                   <div key={`dataItem-${dataItem.id}`}>
//                     <DrawerDescription>
//                       {dataItem.name}
//                     </DrawerDescription>
//                   </div>
//                 );
//               })}
//             </DrawerHeader>
//           </div>
//         );
//       })} */}
//     </div>
//   );
// })}
