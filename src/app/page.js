import { Hero } from "@/components/layout/Hero";
import { HomeMenu } from "@/components/layout/HomeMenu";
import { SectionHeaders } from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Ut culpa anim magna officia ipsum ex culpa et exercitation excepteur
            elit eu. Lorem anim pariatur nulla enim proident veniam. Laboris
            deserunt do laborum dolore exercitation dolore incididunt proident
            enim qui excepteur. Est laborum laborum nulla aliquip. Id deserunt
            proident aute aliquip magna aliqua enim Lorem.
          </p>
          <p>
            Quis aliquip elit irure sunt. Consequat laborum ea mollit veniam id
            sit anim ut pariatur in non. Irure laboris ipsum irure magna non
            occaecat labore nulla veniam sunt exercitation. Lorem elit
            adipisicing reprehenderit sint non aute aute ut labore velit cillum
            dolor sit. Id commodo laborum elit eu ex proident voluptate non
            proident exercitation enim eu laboris. Sit occaecat et aute nostrud
            in officia Lorem duis.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+254712567983"
          >
            +254 712 567 983
          </a>
        </div>
      </section>
    </>
  );
}
