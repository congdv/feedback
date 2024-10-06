'use client';

import { PostWithTagAndStatus } from '@/db/queries/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PostCard from './post-card';

interface PostListProps {
  selectTag?: string;
  selectStatus?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function PostList({
  selectTag,
  selectStatus,
  page,
  setPage,
}: PostListProps) {
  const [posts, setPosts] = useState<PostWithTagAndStatus[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchPosts = async (scroll = false) => {
    setLoading(true);
    const searchParams: URLSearchParams = new URLSearchParams();
    const params = [
      {
        key: 'page',
        value: String(page),
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [selectStatus, selectTag]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchPosts(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="mt-10 flex flex-col gap-3">
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
}
