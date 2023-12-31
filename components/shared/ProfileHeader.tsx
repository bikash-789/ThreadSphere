import { Avatar } from "@radix-ui/themes";
import Link from "next/link";
import ShareButton from "../ui/ShareButton";

interface Props {
  accountId: string;
  authUserId: string;
  adminId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type: string;
}

const ProfileHeader = async ({
  accountId,
  authUserId,
  adminId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={imgUrl} fallback={name[0]} alt={username} size={"6"} />
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>
      {/* TODO: Community */}
      {/* BIO */}
      <div className="flex justify-start items-center">
        <p className="mt-6 max-w-lg text-base-regular text-light-2 block">
          {bio}
        </p>
      </div>

      <div className="my-2 lg:my-4 w-full flex justify-between lg:justify-start gap-x-3">
        {type === "User" && accountId === authUserId && (
          <button className="text-white border-[1px] border-slate-500 py-1 px-3 text-small-regular rounded-md">
            <Link href={`/profile/update/${authUserId}`}>Edit Profile</Link>
          </button>
        )}
        {type === "Community" && adminId === authUserId && (
          <button className="text-white border-[1px] border-slate-500 py-1 px-3 text-small-regular rounded-md">
            <Link href={`/communities/update/${accountId}`}>Edit Details</Link>
          </button>
        )}
        <ShareButton
          type={type}
          authUserId={authUserId}
          accountId={accountId}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
