
import React from "react";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationItems from "./NavigationItems";
import ActionButtons from "./ActionButtons";

interface MobileMenuProps {
  isOpen: boolean;
  isScrolled: boolean;
  isEarnPage: boolean;
  navItems: Array<{ label: string; href: string }>;
  isWalletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  onToggle: () => void;
  onNavClick: (href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isScrolled,
  isEarnPage,
  navItems,
  isWalletConnected,
  connectWallet,
  disconnectWallet,
  onToggle,
  onNavClick
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
        ) : (
          <Menu className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-6 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <NavigationItems 
          navItems={navItems} 
          isScrolled={isScrolled} 
          isEarnPage={isEarnPage} 
          onNavClick={onNavClick}
          className="flex-col space-y-6"
        />
        
        <div className="flex flex-col gap-4 pt-4">
          <ActionButtons 
            isEarnPage={isEarnPage}
            isWalletConnected={isWalletConnected}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            className="flex flex-col gap-4"
          />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
