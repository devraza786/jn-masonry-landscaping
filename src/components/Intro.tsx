import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";

const Intro = () => {
  const { content } = useSiteContent();
  return (
    <section className="section-padding bg-background">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary font-heading font-semibold text-lg md:text-xl mb-4 uppercase tracking-widest">Servicing Austin and surrounding areas!</p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Let us transform your outdoor living experience with our team of experts.

            Trusted by homeowners for nearly two decades.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
