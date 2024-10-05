'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PostWithTagAndStatus } from "@/db/queries/post";
import paths from "@/paths";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useFormatter } from 'next-intl';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PostListProps {
  selectTag?: string;
  selectStatus?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>
}

interface Params {
  page: string;
  pageSize: string;
  selectTag?: string;
  selectStatus?: string;
  
}


export default function PostList({selectTag, selectStatus, page, setPage}: PostListProps) {
  const [posts, setPosts] = useState<PostWithTagAndStatus[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const format = useFormatter();
  const router = useRouter();


  const fetchPosts = async(scroll=false) => {
    setLoading(true);
    const searchParams: URLSearchParams = new URLSearchParams();
    let params = [
      {
        key: "page",
        value: String(page)
      },
      {
        key: "pageSize",
        value: "10"
      },
      {
        key: "selectTag",
        value: selectTag
      },
      {
        key: "selectStatus",
        value: selectStatus
      }
    ]

    params.forEach((item) => {
      if(!!item.value) {
        searchParams.append(item.key, item.value);
      }
    })

    try {
      const response = await fetch(`/api/post?${searchParams.toString()}`, {
        headers: {
          Accept: "application/json",
          method: "GET"
        }
      });
      if(response) {
        const data = await response.json();
        if(scroll ) {
          if(data.posts.length > 0) {
            setPosts(prevPosts => [...prevPosts, ...data.posts])
            setPage(prevPage => prevPage + 1);
          }
          
        } else {
          setPosts(data.posts)
        }
        
        
      }
    } catch(error) {
      
    } finally {
      setLoading(false);
    }
    

   
  }
  useEffect( () => {
   fetchPosts();
  }, [selectStatus, selectTag])

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchPosts(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading])

  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post?.tagId ?? "", post.id))
  }

  const renderPost = (post: PostWithTagAndStatus, index: number) => {

    const dateTime = new Date(post.updatedAt);
    const navigate = handleClickPost.bind(null, post);
    return <Card key={index} onClick={navigate} className="cursor-pointer">
      <CardHeader>
        <div className="flex gap-3">
          <span className="p-2 border rounded">{post?.tag?.slug}</span>
          <span className="p-2 border rounded">{post?.status?.description}</span>

        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-3xl">{post.title}</h1>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <Avatar>
          <AvatarImage src={post.user.image ?? ""} alt={post.user.name ?? "unknown"} />
          <AvatarFallback>{post.user.name}</AvatarFallback>
        </Avatar>
        <p className="text-sm ml-1.5 text-gray-400">
          <span className="font-bold">{post.user.name}</span>
          <span className="text-xs font-medium ml-1.5 text-background-accent">{format.relativeTime(dateTime)}</span>
        </p>
      </CardFooter>
    </Card>
  }
    return <div className="mt-10 flex flex-col gap-3">
      {
        posts.map(renderPost)
      }
    </div>
} 