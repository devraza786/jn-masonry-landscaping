import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { useSiteContent } from "@/hooks/use-site-content";
import { useEffect } from "react";

const servicesIcons = {
  masonry: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    </svg>
  ),
  concrete: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1M9 11h1m4 0h1" />
    </svg>
  ),
  outdoor: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-3m14 0l2 3M3 12a9 9 0 0118 0m-9 9a9 9 0 01-8.457-4.614M3 12h18" />
    </svg>
  ),
  design: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

const ServiceSection = ({
  icon,
  title,
  description,
  services,
  index,
  id
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  services: Array<{ name: string; description: string }>;
  index: number;
  id: string;
}) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="section-padding bg-background border-t border-border"
  >
    <div className="container-custom mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              {title}
            </h2>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, serviceIndex) => (
          <motion.div
            key={serviceIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: serviceIndex * 0.05 }}
            className="card-elevated p-6 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 mt-1 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ServicesPage = () => {
  const { content } = useSiteContent();

  useEffect(() => {
    document.documentElement.style.setProperty('--promo-height', '44px');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden" style={{ paddingTop: 'calc(var(--promo-height, 44px) + 80px)' }}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

        {/* Content */}
        <div className="relative z-10 container-custom mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4">
              {content.services.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.services.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <ServiceSection
        id="masonry"
        icon={servicesIcons.masonry}
        title={content.services.sections.masonry.title}
        description={content.services.sections.masonry.description}
        services={content.services.sections.masonry.services}
        index={0}
      />

      <ServiceSection
        id="concrete"
        icon={servicesIcons.concrete}
        title={content.services.sections.concrete.title}
        description={content.services.sections.concrete.description}
        services={content.services.sections.concrete.services}
        index={1}
      />

      <ServiceSection
        id="outdoorLiving"
        icon={servicesIcons.outdoor}
        title={content.services.sections.outdoorLiving.title}
        description={content.services.sections.outdoorLiving.description}
        services={content.services.sections.outdoorLiving.services}
        index={2}
      />

      <ServiceSection
        id="design"
        icon={servicesIcons.design}
        title={content.services.sections.design.title}
        description={content.services.sections.design.description}
        services={content.services.sections.design.services}
        index={3}
      />

      {/* CTA Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and estimate on your project.
            </p>
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
              Request a Free Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default ServicesPage;
