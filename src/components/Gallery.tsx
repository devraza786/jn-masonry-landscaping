import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";

const Gallery = () => {
  const navigate = useNavigate();
  const { content } = useSiteContent();

  const categories = Array.from(new Set(content.gallery.projects.map(p => p.category))).sort();

  const getCategoryImage = (category: string) => {
    const project = content.gallery.projects.find(p => p.category === category);
    return project?.afterImage || '';
  };

  const getCategoryProjectCount = (category: string) => {
    return content.gallery.projects.filter(p => p.category === category).length;
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/gallery?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="gallery" className="section-padding bg-background">
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
            Our Work
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground mt-3 mb-4">
            Project Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of completed projects by service category.
            Click on any category to view detailed images and before/after transformations.
          </p>
        </motion.div>

        {/* Service Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer h-full"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative overflow-hidden rounded-2xl h-80 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Background Image */}
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  {/* Category Title */}
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2 group-hover:text-primary transition-colors">
                    {category}
                  </h3>

                  {/* Project Count */}
                  <p className="text-primary-foreground/90 font-semibold mb-4">
                    {getCategoryProjectCount(category)} {getCategoryProjectCount(category) === 1 ? 'Project' : 'Projects'}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      View Gallery
                    </span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-lg mb-6">
            Want to start your own project?
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
  );
};

export default Gallery;
