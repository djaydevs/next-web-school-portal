import { createContext, useState, FC, ReactNode } from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

interface ProviderValue {
  isCollapsed: boolean;
  toggleSidebarCollapse: () => void;
}

const initialValue: ProviderValue = {
  isCollapsed: false,
  toggleSidebarCollapse: () => {},
};

const SidebarContext = createContext<ProviderValue>(initialValue);

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleSidebarCollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  const value: ProviderValue = {
    isCollapsed,
    toggleSidebarCollapse,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
