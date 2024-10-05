"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, Flame, ListFilter, TrendingUp, X } from "lucide-react";
import FeedbackCreateForm from "./feedback-create-form";
import PostList from "../posts/post-list";
import { User } from "next-auth";
import type { Tag, Status } from '@prisma/client';
import { useState } from "react";

interface FeedbacksProps {
  status: Status[];
  tags: Tag[];
  user?: User;
}


export default function Feedbacks({status, tags, user}: FeedbacksProps) {
  const [selectTag, setTag] = useState<Tag>();
  const [selectStatus, setStatus] = useState<Status>()
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-row gap-x-2">
          <Button variant="outline" disabled>
            <Flame className="mr-2 h-4 w-4" />
            Top
          </Button>
          <Button variant="outline" disabled>
            <Clock className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="outline" disabled>
            <TrendingUp className="mr-2 h-4 w-4" /> Trending
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <ListFilter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-30" align="end">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Status</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {status.map(st => (
                      <DropdownMenuItem key={st.id} onClick={() => {setStatus(st); setPage(1);}}>
                        <span>{st.description}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Tag</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {tags.map(tag => (
                      <DropdownMenuItem key={tag.id} onClick={() => {setTag(tag); setPage(1);}}>
                        <span>{tag.description}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>

          </DropdownMenu>
          {user?.id && <FeedbackCreateForm post={null} tags={tags} tagId={tags[0].id} statusId={status[0].id} status={status} />}
        </div>
      </div>
      <div className="mt-5 flex flex-row gap-3 items-center">
        {selectStatus && <div className="flex flex-row items-center"><span className="p-1 border rounded bg-green-500">{selectStatus.description}</span> <Button variant={"outline"} onClick={() => setStatus(undefined)}> <X className="h-4 w-4"/></Button> </div>}
        {selectTag && <div className="flex flex-row items-center"><span className="ml-2 p-1 border rounded bg-yellow-200">{selectTag.description}</span> <Button variant={"outline"} onClick={() => setTag(undefined)}> <X className="h-4 w-4"/></Button> </div>}
      </div>
      <PostList selectTag={selectTag?.id} selectStatus={selectStatus?.id} page={page} setPage={setPage}/>
    </>
  )
}