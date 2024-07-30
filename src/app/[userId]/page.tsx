"use client";
import type { Task } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";
import CustomCheckBox from "./CheckBox";
import TaskInput from "./TaskInput";

function Main() {
  const pathname = usePathname();
  const name = pathname.split("/").pop() ?? "1"; // Get the last part of the URL
  const { data: Tasks } = api.post.getTasks.useQuery({ name: name });

  const [isExpanded, setIsExpanded] = useState(false);

  const [completedTasks, unCompletedTasks] = useMemo(() => {
    return Tasks
      ? [
          Tasks.filter((t) => t.isCompleted),
          Tasks.filter((t) => !t.isCompleted),
        ]
      : [[] as Task[], [] as Task[]];
  }, [Tasks]);

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-[#faf9f8] pt-10">
      <div className="w-full max-w-[1440px]">
        <section className="flex flex-col gap-3">
          <TaskInput name={name} />
          {unCompletedTasks.map((task) => {
            return (
              <TaskLayout content={task.content} key={task.id} className="" />
            );
          })}
        </section>
        <section>
          <div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Hide Completed Tasks" : "Show Completed Tasks"}
            </button>
          </div>
          <div
            className={
              "flex flex-col gap-3" + (isExpanded ? "block" : "hidden")
            }
          >
            {completedTasks.map((task) => {
              return (
                <TaskLayout
                  content={task.content}
                  key={task.id}
                  className="line-through"
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;

function TaskLayout({
  className,
  content,
}: {
  className?: string;
  content: string;
}) {
  return (
    <div
      className={
        "flex w-full items-center gap-5 rounded-md bg-white p-4 text-[1.25rem] font-light text-gray-700 shadow-md hover:bg-[#eff6fc] " +
        className
      }
    >
      <CustomCheckBox color="#2564cf" />
      <span className={"grow " + className}>{content}</span>
    </div>
  );
}
