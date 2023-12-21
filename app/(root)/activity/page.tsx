import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  // if (!userInfo?.onboarded) redirect("/onboarding");

  // getActivity
  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.replies.length > 0 ? (
          <>
            {activity.replies &&
              activity.replies.map((activity) => {
                return (
                  <Link
                    key={activity._id}
                    href={`/thread/${activity.parentId}`}
                  >
                    <article className="activity-card">
                      <div className="w-[24px] h-[24px] rounded-full overflow-clip">
                        <Image
                          src={activity.author.image}
                          alt="profile photo"
                          width={24}
                          height={24}
                          className="rounded-full object-cover overflow-clip"
                        />
                      </div>
                      <p className="text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activity.author.name}
                        </span>{" "}
                        replied to your thread.
                      </p>
                    </article>
                  </Link>
                );
              })}
          </>
        ) : (
          ""
        )}
        {activity.likes?.length > 0 && (
          <>
            {activity.likes &&
              activity.likes.map((like: any) => (
                <Link key={like._id} href={`/thread/${like.threadId}`}>
                  {" "}
                  // Assuming link is for the thread
                  <article className="activity-card">
                    <div className="w-[24px] h-[24px] rounded-full overflow-clip">
                      <Image
                        src={like.likedBy.image} // Accessing liked user details
                        alt="profile photo"
                        width={24}
                        height={24}
                        className="rounded-full object-cover overflow-clip"
                      />
                    </div>
                    <p className="text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {like.likedBy.name}
                      </span>
                      liked your thread.
                    </p>
                    <span></span>
                  </article>
                </Link>
              ))}
          </>
        )}
        {activity.likes &&
          activity.replies &&
          activity.likes.length < 1 &&
          activity.replies.length < 1 && (
            <p className="text-base-regular text-light-3">No activity yet</p>
          )}
      </section>
    </section>
  );
};
export default Page;
