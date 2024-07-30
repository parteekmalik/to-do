import { useState } from "react";
import { api } from "~/trpc/react";

function TaskInput({ name }: { name: string }) {
  const [newTaskContent, setNewTaskContent] = useState("");

  const APIutils = api.useUtils();

  const createTaskApi = api.post.create.useMutation({
    onSettled() {
      APIutils.post.getTasks.invalidate().catch((err) => console.log(err));
    },
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    console.log("submiting task ...");
    event.preventDefault();
    createTaskApi.mutate({ content: newTaskContent, userName: name ?? "1" });
    setNewTaskContent("");
    setIsFocused(false);
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex w-full flex-col shadow-md"
    >
      <div
        className={`flex w-full items-center bg-white p-4`}
        onClick={() => setIsFocused(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2564cf"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <input
          type="text"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="grow border-none p-2 focus:outline-none"
        />
      </div>
      <div
        className={`flex w-full bg-[#faf9f8] p-4 ${isFocused ? "block" : "hidden"}`}
      >
        <button
          type="submit"
          className={`ml-auto border-2 bg-[#fdfdfd] ${newTaskContent !== "" ? "text-[#2564cf]" : ""} px-4 py-2 text-base`}
        >
          Add
        </button>
      </div>
    </form>
  );
}
export default TaskInput;
