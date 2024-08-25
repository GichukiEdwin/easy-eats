"use client";
import Image from "next/image";
import { useMenuItems } from "../../hooks/useMenuItems";
import { MenuItem } from "../menu/MenuItem";
import { SectionHeaders } from "./SectionHeaders";

export const HomeMenu = () => {
  const { data: menuItems, isLoading, isError } = useMenuItems();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading menu items</div>;
  }

  const bestSellers = menuItems.slice(-3);

  return (
    <section>
      <div className="absolute w-full left-0 right-0 justify-start">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image
            src={"/sallad1.png"}
            alt={"sallad"}
            width={"109"}
            height={"189"}
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/sallad2.png"}
            alt={"sallad"}
            width={"107"}
            height={"195"}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Check out"}
          mainHeader={"Our best sellers"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem {...item} key={item.id} />)}
      </div>
    </section>
  );
};
//<MenuItem />
