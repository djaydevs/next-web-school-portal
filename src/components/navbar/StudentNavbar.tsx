import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileStudentSide } from "@/components/sidebar/MobileStudentSide";
import { SafeUser } from "@/types";

interface studentNavbarProps {
  currentUser?: SafeUser | null;
}

const StudentNavbar: React.FC<studentNavbarProps> = ({ currentUser }) => {
  return (
    <div className="flex items-center p-4">
      <MobileStudentSide />
      <div className="flex items-center w-full justify-end">
        <Avatar>
          {currentUser?.image && (
            <AvatarImage src={currentUser?.image} alt="avatar image" />
          )}
          <AvatarFallback>J{currentUser?.name}</AvatarFallback>
        </Avatar>
        <h3 className="ms-2">{currentUser?.name}</h3>
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </div>
  );
};

export default StudentNavbar;
