import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link className="uppercase text-primary font-semibold text-2xl" href="">
        Easy Eats
      </Link>
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        <Link
          href={""}
          className="bg-primary text-white rounded-full py-2 px-8"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};
