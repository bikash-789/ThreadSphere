import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import { Avatar } from "@radix-ui/themes";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  likedBy: {
    id: String;
    name: String;
    username: String;
    image: String;
  }[];
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  likedBy,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author.id}`}
              className="relative h-11 w-11 overflow-clip rounded-full"
            >
              <Avatar
                src={author.image}
                alt="user_community"
                size="3"
                fallback={author?.name[0]}
                radius="full"
                className="cursor-pointer"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2 text-justify">
              {content}
            </p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                {/* LikeThread */}
                <LikeThread
                  threadId={JSON.stringify(id)}
                  currentUserId={currentUserId}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="comment"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {/* likes count */}
              {likedBy && likedBy.length > 0 && (
                <small className="text-gray-1">
                  {likedBy.length.toString()} likes
                </small>
              )}
              {/* Replies count */}
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>
      {/* Show the user avatars if they have replied to the thread post */}
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <div className={`${index !== 0 && "-ml-[12px]"}`}>
              <Avatar
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                size="1"
                fallback={"U"}
                radius="full"
              />
            </div>
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
      {/* Show the community avatar if the post is posted by Community member */}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            <span className="inline-block">{formatDateString(createdAt)}</span>
            <span className="inline-block">
              {community && ` - ${community.name} Community`}{" "}
              <Avatar
                src={community.image}
                alt={community.name}
                size="1"
                fallback={community?.name[0]}
                radius="full"
              />
            </span>
          </p>
        </Link>
      )}
      {/* Date */}
      {!community && (
        <p className="text-subtle-medium text-gray-1 mt-5">
          {formatDateString(createdAt)}
        </p>
      )}
    </article>
  );
}

export default ThreadCard;
