import Image from "next/image";
import { MenuItem } from "../menu/MenuItem";

export const HomeMenu = () => {
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
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          Check Out
        </h3>
        <h2 className="text-primary font-semibold text-4xl italic">Menu</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};
