import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import { Avatar } from "@radix-ui/themes";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // getActivity
  const activities = await getActivity(userInfo._id);
  // console.log(activities);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activities &&
          activities.length > 0 &&
          activities.map((activity: any) => {
            return (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Avatar
                    src={
                      activity.type == "reply"
                        ? activity.author.image
                        : activity.likedBy.image
                    }
                    alt="profile_pic"
                    size="2"
                    fallback={
                      activity.type == "reply"
                        ? activity.author.name
                        : activity.likedBy.name
                    }
                    radius="full"
                    className="cursor-pointer"
                  />
                  <p className="text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.type == "reply"
                        ? activity.author.name
                        : activity.likedBy.name}
                    </span>{" "}
                    {activity.type == "reply"
                      ? "replied to your thread"
                      : "liked your thread"}
                  </p>
                  <span className="text-subtle-medium text-gray-1 ml-auto">
                    {formatDateString(activity.createdAt)}
                  </span>
                </article>
              </Link>
            );
          })}

        {activities && activities.length < 1 ? (
          <p className="text-base-regular text-light-3">No activity yet</p>
        ) : (
          ""
        )}
      </section>
    </section>
  );
};
export default Page;
