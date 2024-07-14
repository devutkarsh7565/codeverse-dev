import { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerWithMemberAndProfile = Server & {
  Members: (Member & { profile: Profile })[];
  Channels: (Channel & { profile: Profile })[];
};
