import Image from "next/image";

export const Hero = () => {
  return (
    <section className="grid grid-cols-2 mt-4">
      <div>
        <h1 className="text-4xl font-semibold">
          Welcome to EasyEats - Where Culinary Wonders Await!
        </h1>
        <p className="my-4 text-gray-500">
          Embark on a culinary journey like never before with EasyEats, where
          every bite tells a story and every meal is an exploration. Immerse
          yourself in a world of diverse flavors, handpicked from the finest
          restaurants. Our app is not just a food ordering platform; it&apos;s a
          portal to a universe of gastronomic delights.
        </p>
      </div>
      <div className="relative">
        <Image
          src={"/pexels-alteredsnaps-11783274.jpg"}
          alt={"Pizza"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
};
