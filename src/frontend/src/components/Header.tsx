import { Button } from "@/components/ui/button";
import { Menu, Shield, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onAnalyzeClick: () => void;
}

export default function Header({ onAnalyzeClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", active: true },
    { label: "Analyze Skin", onClick: onAnalyzeClick },
    { label: "Conditions" },
    { label: "Appointments" },
    { label: "Resources" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5" data-ocid="header.link">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            SkinCheck AI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={link.onClick}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                link.active
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: profile + mobile menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="header.profile_button"
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
          >
            <User className="w-4 h-4" />
          </button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="header.mobile_menu.toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => {
                link.onClick?.();
                setMobileOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md font-medium mt-1 ${
                link.active
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
