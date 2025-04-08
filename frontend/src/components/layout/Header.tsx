
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "../ui-custom/Logo";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import NavigationItems from "./navigation/NavigationItems";
import ActionButtons from "./navigation/ActionButtons";
import MobileMenu from "./navigation/MobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isWalletConnected, connectWallet, disconnectWallet } = useWeb3Wallet();
  const isEarnPage = location.pathname === "/earn-prsna" || location.pathname === "/prsna-ecosystem";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "AI Interviewer", href: "/interviewer" },
    { label: "AI Researcher", href: "/research" },
    { label: "Web3", href: "/earn-prsna" },
    { label: "Team", href: "/team" },
    { label: "Pricing", href: "/pricing" },
    { label: "Admin", href: "/persona-creation/admin-questionnaire" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    // If it's a hash link, handle smooth scrolling
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    // External links will be handled by Link component
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md" 
          : "bg-slate-900/90 backdrop-blur-md"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo 
              size="md" 
              className={isScrolled ? "text-foreground" : "text-white"}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationItems 
          navItems={navItems} 
          isScrolled={isScrolled} 
          isEarnPage={isEarnPage}
          className="hidden md:flex"
        />

        {/* Desktop Action Buttons */}
        <ActionButtons 
          isEarnPage={isEarnPage}
          isWalletConnected={isWalletConnected}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          className="hidden md:flex items-center gap-3"
        />

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen}
          isScrolled={isScrolled}
          isEarnPage={isEarnPage}
          navItems={navItems}
          isWalletConnected={isWalletConnected}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNavClick={handleNavClick}
        />
      </div>
    </header>
  );
};

export default Header;
