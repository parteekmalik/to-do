"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <form action="" className="flex gap-5 rounded bg-white px-5 py-10">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="m-0 rounded-md border-2 border-black p-2 text-black"
        />
        <Link
          href={`/${inputValue}`}
          className="rounded-md bg-black px-4 py-2 text-white hover:shadow-lg"
        >
          Login
        </Link>
      </form>
    </main>
  );
}
