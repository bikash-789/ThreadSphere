import {
  fetchUser,
  getActivity,
  getLikedByActivity,
} from "@/lib/actions/user.actions";
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
  const likedThreads = await getLikedByActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => {
              return (
                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                  <article className="activity-card">
                    <Image
                      src={activity.author.image}
                      alt="profile photo"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
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
        {likedThreads.length > 0 ? (
          <>
            {likedThreads.map((thread) => {
              const authorIdString = thread.author._id.toString();

              const filteredLikes = thread.likedBy.filter(
                (people: any) => people._id.toString() !== authorIdString
              );

              if (filteredLikes.length > 0) {
                return (
                  <Link key={filteredLikes._id} href={`/thread/${thread._id}`}>
                    {filteredLikes.map((people: any) => (
                      <article className="activity-card" key={people._id}>
                        <Image
                          src={people.image}
                          alt="profile"
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                        <p className="text-small-regular text-light-1">
                          <span className="mr-1 text-primary-500">
                            {people.name}
                          </span>{" "}
                          liked your thread.
                        </p>
                        <span></span>
                      </article>
                    ))}
                  </Link>
                );
              }
              return null; // Skip rendering if there are no filtered likes
            })}
          </>
        ) : (
          ""
        )}
        {activity.length < 1 && likedThreads.length < 1 && (
          <p className="text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
};
export default Page;
