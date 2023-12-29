import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@radix-ui/themes";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/communities/${id}`} className="relative w-12">
          <Avatar
            src={imgUrl}
            alt="user_community"
            size="3"
            fallback={name[0]}
            radius="full"
            className="cursor-pointer"
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${id}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {members && members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <div key={index} className={`${index !== 0 && "-ml-[12px]"}`}>
                <Avatar
                  src={member.image}
                  alt={`user_${index}`}
                  size="2"
                  fallback="U"
                  radius="full"
                />
              </div>
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
