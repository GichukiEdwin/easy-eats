import Image from "next/image";
import { Right } from "../icons/Right";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          At Easy Eats, we believe that life is simply better with{" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          From the first bite to the last, our curated collection promises a
          symphony of flavors, turning every occasion into a celebration.
          <br />
          Every moment is seasoned with the magic of pizza.
        </p>
        <div className="flex gap-4 items-center text-sm">
          <button className="bg-primary text-white rounded-full px-4 py-2 flex gap-2 uppercase items-center">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 font-semibold text-gray-600">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt={"Pizza"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
};
