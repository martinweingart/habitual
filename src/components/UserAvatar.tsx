import { getNameFirstChars } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  src?: string;
  name: string;
};

function UserAvatar({ src, name }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{getNameFirstChars(name)}</AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
