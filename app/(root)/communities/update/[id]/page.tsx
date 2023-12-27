import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import CommunityProfile from "@/components/forms/CommunityProfile";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  //   if (userInfo?.onboarded) redirect("/");

  const communityDetails = await fetchCommunityDetails(params.id);

  const communityData = {
    id: communityDetails ? communityDetails?.id : "",
    name: communityDetails ? communityDetails?.name : "",
    username: communityDetails ? communityDetails?.username : "",
    bio: communityDetails ? communityDetails?.bio : "",
    image: communityDetails ? communityDetails?.image : "",
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Community Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Update community details
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <CommunityProfile community={communityData} btnTitle="Update" />
      </section>
    </main>
  );
}

export default Page;
