import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Sign In | Not Verified User",
  description: "Not Verified User",
};

interface NotVerifiedPageProps {}

const NotVerified: FC<NotVerifiedPageProps> = ({}) => {
  return <div>Not Verified</div>;
};

export default NotVerified;
