import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { useSiteContent } from "@/hooks/use-site-content";
import { useEffect } from "react";

const About = () => {
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
              {content.about.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.about.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-8 text-center">
              {content.about.content.title}
            </h2>

            <div className="space-y-6">
              {content.about.content.sections.map((section, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {section}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-4">
              {content.about.whyDifferent.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.about.whyDifferent.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-8 text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Text */}
                <p className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-6">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote from our team of experts.
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

export default About;
