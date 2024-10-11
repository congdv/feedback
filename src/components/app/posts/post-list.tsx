'use client';

import { PostWithTagAndStatus } from '@/db/queries/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PostCard from './post-card';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderIcon } from 'lucide-react';

interface PostListProps {
  selectTag?: string;
  selectStatus?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

type PostDetail = PostWithTagAndStatus & { postReaction: Array<{userId: string}>};

export default function PostList({
  selectTag,
  selectStatus,
  page,
  setPage,
}: PostListProps) {
  const [posts, setPosts] = useState<PostDetail[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const session = useSession();

  const fetchPosts = async (scroll = false) => {
    if(scroll) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    const searchParams: URLSearchParams = new URLSearchParams();
    const params = [
      {
        key: 'page',
        value: String(scroll ? page + 1 : page),
      },
      {
        key: 'pageSize',
        value: '10',
      },
      {
        key: 'selectTag',
        value: selectTag,
      },
      {
        key: 'selectStatus',
        value: selectStatus,
      },
    ];

    params.forEach((item) => {
      if (!!item.value) {
        searchParams.append(item.key, item.value);
      }
    });

    try {
      const response = await fetch(`/api/post?${searchParams.toString()}`, {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        },
      });
      if (response) {
        const data = await response.json();

        if (scroll) {
          if (data.posts.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setPage((prevPage) => prevPage + 1);
          }
        } else {
          setPosts(data.posts);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      if(scroll) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [selectStatus, selectTag]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading || isLoadingMore
    ) {
      return;
    }
    fetchPosts(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  if(session.status === "loading" || isLoading) {
    return (<div className="mt-10 flex flex-col gap-3">
      <div>
        <Skeleton className="h-8 min-w-64 min-h-32" />;

      </div>
      <div className='mt-2'>
        <Skeleton className="h-8 min-w-64 min-h-32" />;

      </div>
      <div>
        <Skeleton className="h-8 min-w-64 min-h-32" />;

      </div>
      <div className='mt-2'>
        <Skeleton className="h-8 min-w-64 min-h-32" />;

      </div>
      <div className='mt-2'>
        <Skeleton className="h-8 min-w-64 min-h-32" />;

      </div>

  </div>)
  } else if(posts.length === 0 && isLoading === false) {
    return (
      <div className='p-10'>
        <p className='text-xl text-black-400 text-center'>No posts have been added yet.</p>
      </div>
    )
  }


  return (
    <div className="mt-10 flex flex-col gap-3">
      {posts.map((post, index) => (
        <PostCard post={post} key={index} user={session.data?.user}/>
      ))}
      <div className='flex flex-row justify-center p-2'>
        {isLoadingMore && <LoaderIcon className="animate-spin" />}

      </div>
    </div>
  );
}
