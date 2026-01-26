import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/use-site-content";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fc9eb1ef2d46349c996d329a3c104d50e%2Fcd6cc39b24b34dc9be39e99c783e2a27?format=webp&width=800";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();

  return (
    <footer className="bg-neutral-900 py-12">
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Company */}
          <div className="text-center md:text-left">
            <div className="inline-block mb-4">
              <img
                src={LOGO_URL}
                alt="JN Masonry & Landscaping"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-neutral-300">
              {content.footer.tagline}
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="font-heading font-bold text-lg mb-4 text-primary">
              Contact Us
            </h4>
            <div className="space-y-2">
              <a
                href="tel:1-512-734-2958"
                className="block text-neutral-300 hover:text-primary transition-colors"
              >
                📞 512 734 2958
              </a>
              <a
                href="mailto:jnmscapes@gmail.com"
                className="block text-neutral-300 hover:text-primary transition-colors"
              >
                ✉️ jnmscapes@gmail.com
              </a>
              <p className="text-neutral-300">📍 liberty hill</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-heading font-bold text-lg mb-4 text-primary">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-neutral-300 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-neutral-700 text-center flex items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm flex-1">
            © {currentYear} JN Masonry & Landscaping LLC. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs opacity-60 hover:opacity-100"
            title="Admin Panel"
          >
            ⚙️
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
