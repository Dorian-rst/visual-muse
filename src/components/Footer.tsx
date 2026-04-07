import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-earth-forest py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-earth-sage" />
            <span className="text-lg font-serif font-bold text-earth-cream">BackToEarth</span>
          </div>
          <p className="text-earth-cream/60 text-sm">
            © 2025 BackToEarth. Voyagez responsable, préservez la Terre.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
