"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../context/SidebarContext';
import { 
    ChartBarIcon,
    GlobeAltIcon,
    BookOpenIcon,
    BeakerIcon,
    ChevronLeftIcon, 
    ChevronRightIcon,
    BuildingLibraryIcon
} from '@heroicons/react/24/outline';

// Define the navigation items with more metadata
const navigationItems = [
    { 
        name: 'Dashboard Overview', 
        href: '/dashboard', 
        icon: ChartBarIcon,
        color: 'from-[#2CD9FF] to-[#14B8FF]'
    },
    { 
        name: 'Regions', 
        href: '/region1', 
        icon: GlobeAltIcon,
        color: 'from-[#2CD9FF] to-[#14B8FF]'
    },
    // { 
    //     name: 'University', 
    //     href: '/university', 
    //     icon: AcademicCapIcon,
    //     color: 'from-[#2CD9FF] to-[#14B8FF]'
    // },
    { 
        name: 'Degree', 
        href: '/degree', 
        icon: BookOpenIcon,
        color: 'from-[#2CD9FF] to-[#14B8FF]'
    },
    { 
        name: 'Major', 
        href: '/major', 
        icon: BeakerIcon,
        color: 'from-[#2CD9FF] to-[#14B8FF]'
    },
];

const Sidebar = () => {
    const { isCollapsed, toggleSidebar } = useSidebar();
    const pathname = usePathname();

    return (
        <aside 
            className={`fixed opacity-70 backdrop-blur-sm left-0 top-0 h-screen bg-[#1E2875] text-white transition-all duration-300 
            ${isCollapsed ? 'w-20' : 'w-72'} 
            shadow-xl z-50`}
        >
            {/* Logo Section */}
            <div className="p-4 border-b border-[#2E3895]">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed ? (
                        <div className="flex items-center gap-2">
                            <BuildingLibraryIcon className="h-8 w-8 text-[#2CD9FF]" />
                            <span className="font-bold text-xl bg-gradient-to-r from-[#2CD9FF] to-[#14B8FF] bg-clip-text text-transparent">
                                UniGuide
                            </span>
                        </div>
                    ) : (
                        <BuildingLibraryIcon className="h-8 w-8 text-[#2CD9FF]" />
                    )}
                </div>
            </div>

            {/* Navigation Section */}
            <div className="py-6">
                <nav className="space-y-2 px-3">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center p-3 rounded-xl transition-all duration-200
                                ${isActive 
                                    ? `bg-gradient-to-r ${item.color} shadow-lg` 
                                    : 'hover:bg-[#2E3895]'
                                } 
                                group relative
                                ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <Icon 
                                    className={`h-6 w-6 transition-all duration-200
                                    ${isActive ? 'text-white' : 'text-[#2CD9FF] group-hover:text-white'}`}
                                />
                                
                                {!isCollapsed && (
                                    <span className={`ml-3 transition-all duration-200
                                        ${isActive ? 'text-white font-medium' : 'text-[#2CD9FF] group-hover:text-white'}`}>
                                        {item.name}
                                    </span>
                                )}

                                {/* Enhanced Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-6 hidden group-hover:block z-50">
                                        <div className="bg-[#1E2875] text-white text-sm px-4 py-2 rounded-md whitespace-nowrap shadow-lg border border-[#2E3895]/30">
                                            {item.name}
                                        </div>
                                        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 
                                            border-8 border-transparent border-r-[#1E2875]"/>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={`absolute -right-3 top-12 bg-[#1E2875] rounded-full p-1.5 
                hover:bg-[#2E3895] transition-colors duration-200 shadow-lg
                border border-[#2E3895]`}
            >
                {isCollapsed 
                    ? <ChevronRightIcon className="h-4 w-4 text-[#2CD9FF]" />
                    : <ChevronLeftIcon className="h-4 w-4 text-[#2CD9FF]" />
                }
            </button>
        </aside>
    );
};

export default Sidebar;
