import React from "react";
function shareProfile(): void {
  // Get the text field
  var link: HTMLAnchorElement | null = document.getElementById(
    "profile-link"
  ) as HTMLAnchorElement;

  if (link) {
    // Copy the link inside href
    navigator.clipboard.writeText(link.href);

    // Alert the copied text
    alert("Copied the text: " + link.href);
  } else {
    alert("Link not found");
  }
}

function ShareButton({
  adminId,
  authUserId,
  accountId,
  type,
}: {
  adminId: string;
  authUserId: string;
  accountId: string;
  type: string;
}) {
  return (
    accountId !== authUserId && (
      <button
        className="text-white border-[1px] border-slate-500 py-1 px-3 text-small-regular rounded-md"
        onClick={shareProfile}
      >
        <a
          id="profile-link"
          href={`https://app-threads-eta.vercel.app/${
            type == "Community" ? "communities/" : "profile/"
          }${accountId}`}
        >
          Share Profile
        </a>
      </button>
    )
  );
}

export default ShareButton;
