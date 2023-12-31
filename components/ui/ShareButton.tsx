"use client";
import React, { useState } from "react";

function ShareButton({
  authUserId,
  accountId,
  type,
}: {
  authUserId: string;
  accountId: string;
  type: string;
}) {
  const [copy, setCopy] = useState(false);

  function shareProfile(type: string, accountId: string): void {
    // Get the text field
    var link = `https://app-threads-eta.vercel.app/${
      type == "Community" ? "communities/" : "profile/"
    }${accountId}`;

    // Corrected clipboard usage
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopy(true);
        // Set a timeout to clear the message after 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setCopy(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  }

  function info() {
    return (
      <div>
        <p className="text-green-700">✅ Profile Link copied to clipboard!</p>
      </div>
    );
  }

  const handleClick = () => {
    if (accountId !== authUserId) {
      shareProfile(type, accountId);
    }
  };

  return (
    <>
      {accountId !== authUserId && (
        <button
          className="text-white border-[1px] border-slate-500 py-1 px-3 text-small-regular rounded-md"
          onClick={handleClick}
        >
          Share Profile
        </button>
      )}
      <br />
      {copy && info()}
    </>
  );
}

export default ShareButton;
