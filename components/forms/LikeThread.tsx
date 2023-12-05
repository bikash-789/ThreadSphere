"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  likeThread,
  isLiked,
  unlikeThread,
} from "@/lib/actions/thread.actions";
import { useEffect, useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
}

function LikeThread({ threadId, currentUserId }: Props) {
  // check if it is liked or not from database
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        let likes = await isLiked(JSON.parse(threadId), currentUserId);
        if (likes.length > 0) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [threadId, currentUserId]);

  const pathname = usePathname();
  const handleLikeClick = async () => {
    // Assuming likeThread returns a promise
    try {
      if (liked) {
        await unlikeThread(JSON.parse(threadId), currentUserId, pathname);
        setLiked(false);
      } else {
        await likeThread(JSON.parse(threadId), currentUserId, pathname);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error liking thread:", error);
    }
  };
  return (
    <Image
      src={
        liked === true ? `/assets/heart-filled.svg` : `/assets/heart-gray.svg`
      }
      alt="like"
      width={24}
      height={24}
      onClick={handleLikeClick}
      className="cursor-pointer object-contain"
    />
  );
}

export default LikeThread;
