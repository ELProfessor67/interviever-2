
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavigationItemsProps {
  navItems: NavItem[];
  isScrolled: boolean;
  isEarnPage: boolean;
  onNavClick?: (href: string) => void;
  className?: string;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  navItems, 
  isScrolled, 
  isEarnPage, 
  onNavClick,
  className
}) => {
  const location = useLocation();

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {navItems.map((item) => (
        item.href.startsWith("#") ? (
          <button
            key={item.label}
            onClick={() => onNavClick && onNavClick(item.href)}
            className={cn(
              "text-sm font-medium transition-colors",
              isScrolled 
                ? "text-foreground hover:text-primary" 
                : "text-white/90 hover:text-white"
            )}
          >
            {item.label}
          </button>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "text-sm font-medium transition-colors",
              (item.href === '/earn-prsna' && isEarnPage) || 
              (item.href === '/research' && location.pathname === '/research') ||
              (item.href === '/interviewer' && location.pathname === '/interviewer') ||
              (item.href === '/' && location.pathname === '/')
                ? "text-primary font-bold" 
                : isScrolled 
                  ? "text-foreground/80 hover:text-foreground" 
                  : "text-white/90 hover:text-white"
            )}
            onClick={() => onNavClick && onNavClick(item.href)}
          >
            {item.label}
          </Link>
        )
      ))}
    </nav>
  );
};

export default NavigationItems;
