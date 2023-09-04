import { signOut } from "next-auth/react";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface signOutProps {}

const SignoutButton: FC<signOutProps> = ({}) => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <Button
      variant="link"
      className="text-sm text-primary/70 hover:text-primary"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignoutButton;
