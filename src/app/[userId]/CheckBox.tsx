import { useState } from "react";

function CustomCheckBox({ color }: { color: string }) {
  const [isChecked, setisChecked] = useState(false);
  const [ishover, setishover] = useState(false);
  return (
    <label className="relative cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        name="size-choice"
        onClick={() => setisChecked((prev) => !prev)}
      />
      <span
        className="h-5 w-5"
        onMouseEnter={() => setishover(true)}
        onMouseLeave={() => setishover(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle
            stroke={color}
            fill={!isChecked ? "white" : color}
            cx="12"
            cy="12"
            r="9"
          />
          <path
            stroke={ishover && !isChecked ? color : "white"}
            d="M9 12l2 2l4 -4"
          />
        </svg>
      </span>
    </label>
  );
}
export default CustomCheckBox;
