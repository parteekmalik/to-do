import React from "react";
import CustomCheckBox from "./CheckBox";
import type { Task as taskType } from "@prisma/client";

function Task({
  className,
  task,
  onClick,
  onDeleteClick,
}: {
  className?: string;
  task: taskType;
  onClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <div
      className={
        "flex w-full items-center gap-5 rounded-md bg-white p-4 text-[1.25rem] font-light text-gray-700 shadow-md hover:bg-[#eff6fc] " +
        className
      }
    >
      <CustomCheckBox
        isTrue={task.isCompleted}
        onClick={onClick}
        color="#2564cf"
      />
      <p className={"grow break-all " + className}>{task.content}</p>
      <div
        className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-medium uppercase text-white"
        onClick={onDeleteClick}
      >
        Delete
      </div>
    </div>
  );
}

export default Task;
