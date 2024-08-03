import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const oc = props.old_cont;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    //id: "draggable",
    id: props.id,
    data: {
      old_cont: oc,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    // <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="yellow">
    //   {props.children}
    // </button>
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-1  "
    >
      {props.children}
    </div>
  );
}
