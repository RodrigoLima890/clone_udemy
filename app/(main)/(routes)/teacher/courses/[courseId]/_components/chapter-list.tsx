"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
};

const ChapterList = ({ onEdit, onReorder, items }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [chapters, setChapters] = React.useState<Chapter[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index,0, reorderedItem)
    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updateChapter = items.slice(startIndex, endIndex + 1)
    setChapters(items)
    const bulkUpdateData = updateChapter.map((chapter) => ({
        id:chapter.id,
        position: items.findIndex((item) => item.id === chapter.id)
    }))
    onReorder(bulkUpdateData)

  };

  if (!isMounted) return null;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {
                (provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 border border-popover bg-popover text-foreground rounded-md mb-4 text-sm",
                      chapter.isPublisched &&
                        "bg-primary/50 border-primary/50 text-primary-foreground"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                    className={cn(
                        "px-2 py-5 border-r-foreground/10 hover:bg-muted rounded-1-md transition",
                        chapter.isPublisched && "bg-primary/50 border-r-primary/50"
                    )}
                        {...provided.dragHandleProps}
                    >
                        <Grip className="w-5 h-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {
                            chapter.isFree && (
                                <Badge>Free</Badge>
                            )
                        }
                        <Badge
                            className={
                                cn(
                                    "bg-muted-foreground text-primary-foreground",
                                    chapter.isPublisched && "bg-primary text-primary-foreground"
                                )
                            }
                        >
                            {chapter.isPublisched ? "Published" : "Draft"}
                        </Badge>
                        <Pencil 
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => onEdit(chapter.id)}
                        />
                    </div>
                    
                  </div>
                )}
              </Draggable>
            ))
          }
          {provided.placeholder}  
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
