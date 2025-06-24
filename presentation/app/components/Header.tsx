import HamburgerButton from "./HamburgerButton";
type HeaderProps = {
  onMenuClick: () => void;
  isSidebarOpen: boolean; // Add this prop
};

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 bg-gray-950 border-gray-700 border-b-1 flex items-center justify-between px-4 shadow z-10">
      <div className="flex items-center gap-3">
        <HamburgerButton onClick={onMenuClick} isOpen={isSidebarOpen}/>
        <span className="text-xl font-bold">Job Tracker</span>
      </div>

      <button className="text-white hover:underline">Sign In</button>
    </header>
  );
}