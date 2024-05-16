"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("Credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-2 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image
            src={"/google.png"}
            width={"20"}
            height={"20"}
            alt={"gogle icon"}
          />
          Login with google
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="flex gap-4 justify-center mt-2"
        >
          <Image
            src={"/face_book.png"}
            width={"20"}
            height={"20"}
            alt={"facebook icon"}
          />
          Login with facebook
        </button>
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex gap-4 justify-center mt-2"
        >
          <Image
            src={"/github.png"}
            width={"24"}
            height={"24"}
            alt={"github icon"}
          />
          Login with github
        </button>
      </form>
    </section>
  );
}
