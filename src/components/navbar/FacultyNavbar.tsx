import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileFacultySide } from "@/components/sidebar/MobileFacultySide";
import { SafeUser } from "@/types";

interface facultyNavbarProps {
  currentUser?: SafeUser | null;
}

const FacultyNavbar: React.FC<facultyNavbarProps> = ({ currentUser }) => {
  return (
    <div className="flex items-center p-4">
      <MobileFacultySide />
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

export default FacultyNavbar;
