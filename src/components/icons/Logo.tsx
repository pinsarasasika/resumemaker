import React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 3.5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 3.5v17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20.5v-17z" />
      <path d="M8 9h8" />
      <path d="M8 13h8" />
      <path d="M8 17h4" />
    </svg>
  );
}
