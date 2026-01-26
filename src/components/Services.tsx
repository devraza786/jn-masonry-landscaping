import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";
import { Link } from "react-router-dom";

const serviceIcons: Record<string, React.ReactNode> = {
  'Masonry': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M7 12l8 4m0 0l8-4" />
    </svg>
  ),
  'Concrete': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m5.581 0a2 2 0 110-4H9m0 4a2 2 0 110 4m6-4h.01M9 16h.01" />
    </svg>
  ),
  'Retaining Walls': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 5a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2m-6 0H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2m-6 0v2m6-2v2" />
    </svg>
  ),
  'Fire Pits': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.243L12 12.586m0 0l-5.657 5.657M12 12.586L6.343 6.929M12 12.586l5.657-5.657M12 4a8 8 0 100 16 8 8 0 000-16z" />
    </svg>
  ),
  'Outdoor Kitchens': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  'Flower Beds': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  'Pergolas': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8M3 20.236a9.002 9.002 0 008.99-9.236m10.266 7.964l-1.5-1.5m1.5 1.5l1.5-1.5" />
    </svg>
  ),
  'Lighting': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

const Services = () => {
  const { content } = useSiteContent();

  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-3 mb-4">
            {content.servicesHome.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.servicesHome.subheading}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.servicesHome.items.map((service, index) => (
            <Link
              key={service.name}
              to={`/services#${service.categoryId}`}
              className="no-underline"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group card-elevated p-6 text-center hover:border-primary/30 cursor-pointer h-full transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {serviceIcons[service.name] || (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 mb-3 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {service.category}
                </span>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Underline Accent */}
                <div className="w-0 h-1 bg-primary mx-auto mt-4 group-hover:w-12 transition-all duration-300 rounded-full" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Request a Free Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
