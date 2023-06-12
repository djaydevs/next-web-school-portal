import clsx from "clsx";
interface LinkProps {
  className?: string;
}

const NavbarLinks = ({ className = "" }: LinkProps) => {
  const linkClasses = clsx(className);
  const anchorClasses = clsx(
    "hover:underline underline-offset-8 hover:font-bold focus:font-bold hover:text-primary-700 focus:text-primary-700",
    className
  );

  return (
    <>
      <ul className={linkClasses}>
        <li>
          <a href="" className={anchorClasses}>
            Home
          </a>
        </li>
        <li>
          <a href="" className={anchorClasses}>
            Programs
          </a>
        </li>
        <li>
          <a href="" className={anchorClasses}>
            About
          </a>
        </li>
        <li>
          <a href="" className={anchorClasses}>
            Contacts
          </a>
        </li>
      </ul>
    </>
  );
};

export default NavbarLinks;
