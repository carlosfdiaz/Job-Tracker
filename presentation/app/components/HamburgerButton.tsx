export default function HamburgerButton({ isOpen, onClick, }: { isOpen: boolean; onClick: () => void; }) {
    return (
        <button
            className="flex items-center justify-center w-10 h-10 text-white focus:outline-none lg:hidden hover:bg-gray-700 transition-colors duration-200"
            onClick={onClick}
            aria-label="Toggle menu"
        >
            <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "transform rotate-90" : ""
                    }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                />
            </svg>
        </button>
    );
}