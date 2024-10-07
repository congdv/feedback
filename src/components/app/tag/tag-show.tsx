import { X } from "lucide-react";

interface TagShowProps {
  tag?: string;
  close?: boolean;
  className?: string;
  handleClose?: () => void
}

export default function TagShow({tag, close = false, handleClose, className=""}: TagShowProps) {
  const cl = className + " p-2 border rounded flex shadow-md text-center"
  return (
    <div className={cl}>
      <span className="px-2">{tag}</span>
      {
        close && <span className="border-l-2 cursor-pointer " onClick={handleClose}>
          <X className="ml-2"/>
        </span>
      }
    </div>
  )
}