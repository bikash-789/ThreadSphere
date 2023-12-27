import * as z from "zod";

// Community schema
export const CommunityValidation = z.object({
  profile_photo: z.string().min(1).url(),
  name: z.string().min(3, { message: "MINIMUM 3 CHARACTERS" }).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
});
