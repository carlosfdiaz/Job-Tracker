import HamburgerButton from "./HamburgerButton";
import ModeToggle from "./theme/mode-toggle"
type HeaderProps = {
  onMenuClick: () => void;
  isSidebarOpen: boolean; // Add this prop
};

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 border-b-1 flex items-center justify-between px-4 shadow z-10">
      <div className="flex items-center gap-3">
        <HamburgerButton onClick={onMenuClick} isOpen={isSidebarOpen} />
        <span className="text-xl font-bold">Job Tracker</span>
      </div>
      <div>
        <button className="pr-2 cursor-pointer">Sign In</button>
        <ModeToggle />
      </div>
    </header>
  );
}