import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";

const ServiceArea = () => {
  const { content } = useSiteContent();

  // Filter primary area (first one) and nearby areas (rest)
  const primaryArea = content.contact.info.serviceAreas[0] || "Austin, TX";
  const nearbyAreas = content.contact.info.serviceAreas.slice(1) || [];

  return (
    <section id="areas" className="section-padding bg-surface">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Location Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-20 h-20 mx-auto mb-8 bg-primary rounded-full flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>

          <span className="text-primary font-heading font-semibold text-sm uppercase tracking-widest">
            Service Area
          </span>

          <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-foreground mt-3 mb-6">
            Proudly Serving Nearby areas 
          </h2>

          <h3 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-primary mb-8">
            {[primaryArea, ...nearbyAreas].map((area, index, arr) => (
              <span key={area}>
                {area}
                {index < arr.length - 1 && ", "}
              </span>
            ))}
            <span className="block text-5xl md:text-7xl lg:text-8xl font-black mt-4">TX</span>
          </h3>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            We provide professional landscaping and hardscaping services throughout {primaryArea.split(',')[0]}
            and the surrounding Central Texas communities.
          </p>


          {/* Nearby Areas */}
          {nearbyAreas.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <p className="text-muted-foreground mb-4">Also serving nearby areas:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
