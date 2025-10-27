"use client"

import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ size = "md", className = "", children, ...props }) => {
  let padding = "px-4 py-2"
  if (size === "lg") padding = "px-6 py-3"
  else if (size === "sm") padding = "px-2 py-1"

  return (
    <button
      className={`${padding} rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
