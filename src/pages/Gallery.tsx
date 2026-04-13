import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { useSiteContent } from "@/hooks/use-site-content";

const BeforeAfterSlider = ({ beforeImage, afterImage, title }: { beforeImage?: string; afterImage: string; title: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  if (!beforeImage) {
    return (
      <img
        src={afterImage}
        alt={title}
        className="w-full h-full object-cover"
      />
    );
  }

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="w-full h-full object-cover"
      />

      {/* Before Image Container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="w-screen h-full object-cover"
          style={{ marginLeft: `-${100 - sliderPosition}%` }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="w-5 h-5 text-primary -ml-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const { content } = useSiteContent();
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<typeof content.gallery.projects[0] | null>(null);
  const [filter, setFilter] = useState<string>('');

  const categories = Array.from(new Set(content.gallery.projects.map(p => p.category))).sort();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    document.documentElement.style.setProperty('--promo-height', '44px');
  }, []);

  // Initialize filter on mount and when categories change
  useEffect(() => {
    if (categories.length === 0) return;

    // If URL has a valid category, use it
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilter(categoryFromUrl);
    }
    // Otherwise use first category
    else if (!filter || !categories.includes(filter)) {
      setFilter(categories[0]);
    }
  }, [categories, categoryFromUrl]);

  const filteredProjects = content.gallery.projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
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
              {content.gallery.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.gallery.hero.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="section-padding bg-surface border-b border-border">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(category)}
                className={`px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
                  filter === category
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
                {filter === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary rounded-t-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0">
                  {project.beforeImage ? (
                    <BeforeAfterSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                      title={project.title}
                    />
                  ) : (
                    <img
                      src={project.afterImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary font-heading font-semibold text-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                    <p className="text-primary-foreground font-heading font-bold text-lg mt-1">
                      {project.title}
                    </p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>

                {/* Before/After Badge */}
                {project.beforeImage && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Before/After
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                {selectedProject.beforeImage ? (
                  <BeforeAfterSlider
                    beforeImage={selectedProject.beforeImage}
                    afterImage={selectedProject.afterImage}
                    title={selectedProject.title}
                  />
                ) : (
                  <img
                    src={selectedProject.afterImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 text-primary-foreground hover:text-primary transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-xl">
                <span className="text-primary font-heading font-semibold text-sm uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <p className="text-primary-foreground font-heading font-bold text-xl mt-1">
                  {selectedProject.title}
                </p>
                <p className="text-primary-foreground/80 mt-2">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Get a Free Estimate
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to see your property transformed? Contact us today for a free consultation.
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

export default GalleryPage;
