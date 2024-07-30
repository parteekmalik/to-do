"use client";
import type { Task as TaskType } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";
import Task from "./Task";
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
      : [[] as TaskType[], [] as TaskType[]];
  }, [Tasks]);
  const APIutils = api.useUtils();

  const updateTaskAPI = api.post.update.useMutation({
    onSettled() {
      APIutils.post.getTasks.invalidate().catch((err) => console.log(err));
    },
  });
  const deleteTaskAPI = api.post.delete.useMutation({
    onSettled() {
      APIutils.post.getTasks.invalidate().catch((err) => console.log(err));
    },
  });

  const updateTaskByID = (id: string, isCompleted: boolean) => {
    updateTaskAPI.mutate({ taskId: id, isCompleted });
  };

  const deleteTaskByID = (id: string) => {
    deleteTaskAPI.mutate({ taskId: id });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-[#faf9f8] pt-10">
      <div className="w-full max-w-[1440px]">
        <section className="flex flex-col gap-3">
          <TaskInput name={name} />
          {unCompletedTasks.map((task) => {
            return (
              <Task
                onClick={() => updateTaskByID(task.id, !task.isCompleted)}
                onDeleteClick={() => deleteTaskByID(task.id)}
                task={task}
                key={task.id}
                className=""
              />
            );
          })}
        </section>
        <section>
          <div>
            <button
              className="flex gap-2 p-4 text-xl font-semibold"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <p className={" " + (isExpanded ? "rotate-90" : "")}>{">"}</p>
              <span>{`completed ${completedTasks.length}`}</span>
            </button>
          </div>
          <div
            className={
              "flex flex-col gap-3 " + (isExpanded ? "block" : "hidden")
            }
          >
            {completedTasks.map((task) => {
              return (
                <Task
                  onClick={() => updateTaskByID(task.id, !task.isCompleted)}
                  onDeleteClick={() => deleteTaskByID(task.id)}
                  task={task}
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
