import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { menuProps } from "@/components/layout/module";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/router";
import TabCustom from "./TabCustom";

const DrawerMenu = ({
  className,
  womenCate,
  menCate,
  genderInfo,
}: menuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
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
          <Tabs defaultValue="genderInfo-0">
            <TabsList className="w-full bg-white ">
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

            <TabCustom value="genderInfo-0" data={womenCate} />
            <TabCustom value="genderInfo-1" data={menCate} />
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
