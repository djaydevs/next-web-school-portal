"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

interface signoutModalProps extends ButtonProps {}

const SignoutModal: FC<signoutModalProps> = ({ ...props }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} variant="ghost">
          <Icons.LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/signin`,
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignoutModal;
