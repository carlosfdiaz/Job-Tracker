import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <aside
            className={`fixed z-40 lg:static top-16 left-0 h-[calc(100vh-4rem)] w-64 sidebar-bg border-r-1 shadow transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
            <nav className="p-4 space-y-3">
                <Link to="/" className="block">Create new Log<FontAwesomeIcon className='pl-1' icon={faPlus} /></Link>
            </nav>
        </aside>
    );
}
