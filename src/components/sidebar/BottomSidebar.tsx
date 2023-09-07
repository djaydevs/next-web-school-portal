import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

import { buttonVariants } from "@/components/ui/button";
import SignoutModal from "@/components/auth/signout-modal";

interface BottomSidebarProps {}

const BottomSidebar: FC<BottomSidebarProps> = ({}) => {
  return (
    <div className="p-3 absolute inset-x-0 bottom-0 flex flex-col justify-start items-start">
      <Link
        href="/help"
        className={cn(buttonVariants({ variant: "link" }), "text-sm")}
      >
        Help
      </Link>
      <SignoutModal className="w-full px-4 py-2 justify-start" />
    </div>
  );
};

export default BottomSidebar;
