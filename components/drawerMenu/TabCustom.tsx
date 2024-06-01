import { TabsContent } from "@/components/ui/tabs";

import { CategoriesProps } from "@/redux/module";
import Link from "next/link";
interface TabContentProps {
  value: string;
  data: CategoriesProps[];
}
const TabCustom = ({ value, data }: TabContentProps) => {
  return (
    <TabsContent value={value} className="overflow-y-auto space-y-5">
      {data?.map((item, idx: number) => {
        const cateName = item.name.toLowerCase();
        return (
          <div key={`data-${idx}`} className="ml-4 space-y-3">
            <h1 className="font-bold text-xl"> {item.name} </h1>
            <div className="space-y-2 ml-2">
              <div>
                {item.Sub_Categories.map((itemSub, idx) => {
                  return (
                    <Link
                      href={`/store/${cateName}`}
                      key={`dataClothes-${idx}`}
                      className="font-medium text-base block"
                    >
                      {itemSub.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </TabsContent>
  );
};

export default TabCustom;
