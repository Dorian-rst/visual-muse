import { Leaf } from "lucide-react";

const navLinks = ["Accueil", "Comparateur", "Destinations", "Hébergements", "Activités"];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Connexion
          </a>
          <button className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Commencer
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
