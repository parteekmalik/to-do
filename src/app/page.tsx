"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { api } from "~/trpc/react";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const registerApi = api.post.register.useMutation({
    onSuccess(data, variables, context) {
      router.push("/" + data.name);
    },
  });
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      registerApi.mutate({ name: inputRef.current.value });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex gap-5 rounded bg-white px-5 py-10"
      >
        <input
          ref={inputRef}
          type="text"
          className="m-0 rounded-md border-2 border-black p-2 text-black"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </main>
  );
}
