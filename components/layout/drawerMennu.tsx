import { List } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CategoriesProps } from "@/redux/module";
import { Gender } from "@/redux/reducer/Gender";
import { convertNameCate } from "../LimitedPromotion";
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

  return (
    <div className={className}>
      <Drawer direction="right">
        <DrawerTrigger>
          <List size={24} />
        </DrawerTrigger>
        <DrawerContent>
          <Tabs defaultValue="genderInfo-0" className="w-[400px]">
            <TabsList>
              {/* <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger> */}
              {genderInfo?.map((item, idx) => {
                return (
                  <TabsTrigger key={`genderInfo-${idx}`} value={`genderInfo-${idx}`}>
                    {item.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value="genderInfo-0">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="genderInfo-1">
              Change your password here.
            </TabsContent>
          </Tabs>
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
