"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";

interface signoutModalProps extends ButtonProps {}

const SignoutModal: FC<signoutModalProps> = ({ ...props }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props} variant="ghost">
          Sign Out
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/signin`,
              })
            }
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignoutModal;
