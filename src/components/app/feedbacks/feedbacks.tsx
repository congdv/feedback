'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CirclePlus, Clock, Flame, ListFilter, TrendingUp } from 'lucide-react';
import PostList from '../../posts/post-list';
import { User } from 'next-auth';
import type { Tag, Status } from '@prisma/client';
import { useState } from 'react';
import TagShow from '../tag/tag-show';
import { PostButton } from '@/components/posts/post-button';

interface FeedbacksProps {
  status: Status[];
  tags: Tag[];
  user?: User;
  organizationId: string
  organizationSlug: string
}

export default function Feedbacks({ status, tags, user, organizationId, organizationSlug }: FeedbacksProps) {
  const [selectTag, setTag] = useState<Tag>();
  const [selectStatus, setStatus] = useState<Status>();
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div className="flex items-center md:justify-between md:flex-row flex-col mt-5">
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
        <div className='mt-5 md:mt-0'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'}>
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
                    {status.map((st) => (
                      <DropdownMenuItem
                        key={st.id}
                        onClick={() => {
                          setStatus(st);
                          setPage(1);
                        }}
                      >
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
                    {tags.map((tag) => (
                      <DropdownMenuItem
                        key={tag.id}
                        onClick={() => {
                          setTag(tag);
                          setPage(1);
                        }}
                      >
                        <span>{tag.description}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          {user?.id && (
            <PostButton organizationId={organizationId} asChild>
              <Button>
                <CirclePlus className="mr-2 h-4 w-4" />
                Submit new feedback
              </Button>
            </PostButton>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-row gap-3 items-center">
        {selectTag && (
          <div className="flex flex-row items-center">
            <TagShow
              tag={selectTag.description}
              className="bg-cyan-700 text-white"
              close={true}
              handleClose={() => {
                setTag(undefined);
              }}
            />
          </div>
        )}
        {selectStatus && (
          <div className="flex flex-row items-center">
            <TagShow
              tag={selectStatus.description}
              className="bg-pink-900 text-white"
              close={true}
              handleClose={() => {
                setStatus(undefined);
              }}
            />
          </div>
        )}
      </div>
      <PostList
        selectTag={selectTag?.id}
        selectStatus={selectStatus?.id}
        page={page}
        setPage={setPage}
        organizationId={organizationId}
        organizationSlug={organizationSlug}
      />
    </>
  );
}
