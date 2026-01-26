import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPanel = () => {
  const { content, updateContent, exportContent, importContent, resetContent } = useSiteContent();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportContent();
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(json));
    element.setAttribute("download", "site-content.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Content exported successfully" });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = event.target?.result as string;
          importContent(json);
          toast({ title: "Content imported successfully" });
        } catch (err) {
          toast({
            title: "Import failed",
            description: "Invalid JSON file",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to default? This cannot be undone.")) {
      resetContent();
      toast({ title: "Content reset to default" });
    }
  };

  const EditField = ({
    path,
    label,
    type = "text",
    value,
  }: {
    path: string;
    label: string;
    type?: string;
    value: string | string[];
  }) => {
    const isEditing = editingField === path;

    if (type === "array") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">{label}</label>
          <div className="space-y-2">
            {Array.isArray(value) &&
              value.map((item, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...(value as string[])];
                    newArray[idx] = e.target.value;
                    updateContent(path, newArray);
                  }}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-foreground">{label}</label>
        {isEditing ? (
          <div className="flex gap-2">
            {type === "textarea" ? (
              <textarea
                autoFocus
                value={value}
                onChange={(e) => updateContent(path, e.target.value)}
                onBlur={() => setEditingField(null)}
                rows={3}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground resize-none"
              />
            ) : (
              <input
                autoFocus
                type={type}
                value={value}
                onChange={(e) => updateContent(path, e.target.value)}
                onBlur={() => setEditingField(null)}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            )}
            <button
              onClick={() => setEditingField(null)}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            >
              ✓
            </button>
          </div>
        ) : (
          <div
            onClick={() => setEditingField(path)}
            className="p-3 bg-surface rounded-lg border border-border cursor-pointer hover:border-primary transition-colors group"
          >
            <p className="text-foreground break-words text-sm">{value}</p>
            <p className="text-muted-foreground text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to edit
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-black text-4xl text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage and customize all your website content</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            📥 Export Content
          </button>
          <label className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
            📤 Import Content
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-80 transition-opacity"
          >
            🔄 Reset to Default
          </button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-9 gap-2 bg-surface p-2 rounded-lg overflow-x-auto">
            <TabsTrigger value="hero" className="text-xs md:text-sm whitespace-nowrap">Hero</TabsTrigger>
            <TabsTrigger value="trust" className="text-xs md:text-sm whitespace-nowrap">Trust</TabsTrigger>
            <TabsTrigger value="services-home" className="text-xs md:text-sm whitespace-nowrap">Services</TabsTrigger>
            <TabsTrigger value="services-page" className="text-xs md:text-sm whitespace-nowrap">Services Page</TabsTrigger>
            <TabsTrigger value="why-us" className="text-xs md:text-sm whitespace-nowrap">Why Us</TabsTrigger>
            <TabsTrigger value="about" className="text-xs md:text-sm whitespace-nowrap">About</TabsTrigger>
            <TabsTrigger value="gallery" className="text-xs md:text-sm whitespace-nowrap">Gallery</TabsTrigger>
            <TabsTrigger value="contact" className="text-xs md:text-sm whitespace-nowrap">Contact</TabsTrigger>
            <TabsTrigger value="service-areas" className="text-xs md:text-sm whitespace-nowrap">Service Areas</TabsTrigger>
          </TabsList>

          {/* Hero Tab */}
          <TabsContent value="hero" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Hero Section</h2>
              <div className="space-y-4">
                <EditField path="hero.preHeading" label="Pre-heading" value={content.hero.preHeading} />
                <EditField path="hero.mainHeading" label="Main Heading" value={content.hero.mainHeading} />
                <EditField path="hero.subtitle" label="Subtitle" type="textarea" value={content.hero.subtitle} />
                <EditField path="hero.phoneNumber" label="Phone Number" value={content.hero.phoneNumber} />
                <EditField path="hero.ctaText" label="Free Quote Button Text" value={content.hero.ctaText} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Trust Bar Tab */}
          <TabsContent value="trust" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Trust Bar Section</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">Enabled</label>
                  <input
                    type="checkbox"
                    checked={content.trustBar.enabled}
                    onChange={(e) => updateContent("trustBar.enabled", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                <EditField path="trustBar.text" label="Trust Text" value={content.trustBar.text} />
                <EditField path="trustBar.badgeText" label="Badge Text" value={content.trustBar.badgeText} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Home Tab */}
          <TabsContent value="services-home" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Services (Home Page)</h2>
              <div className="space-y-4">
                <EditField path="servicesHome.heading" label="Heading" value={content.servicesHome.heading} />
                <EditField path="servicesHome.subheading" label="Subheading" type="textarea" value={content.servicesHome.subheading} />
                <div className="mt-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-4">Service Items</h3>
                  {content.servicesHome.items.map((item, idx) => (
                    <div key={idx} className="p-4 bg-background rounded-lg border border-border mb-4">
                      <EditField
                        path={`servicesHome.items.${idx}.name`}
                        label="Service Name"
                        value={item.name}
                      />
                      <EditField
                        path={`servicesHome.items.${idx}.description`}
                        label="Description"
                        value={item.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Why Us Tab */}
          <TabsContent value="why-us" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Why Choose Us Section</h2>
              <div className="space-y-4">
                <EditField path="whyUs.heading" label="Heading" value={content.whyUs.heading} />
                <EditField path="whyUs.subheading" label="Subheading" type="textarea" value={content.whyUs.subheading} />
                <div className="mt-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-4">Why Us Items</h3>
                  {content.whyUs.items.map((item, idx) => (
                    <div key={idx} className="p-4 bg-background rounded-lg border border-border mb-4">
                      <EditField
                        path={`whyUs.items.${idx}.title`}
                        label="Title"
                        value={item.title}
                      />
                      <EditField
                        path={`whyUs.items.${idx}.description`}
                        label="Description"
                        type="textarea"
                        value={item.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">About Page</h2>
              <div className="space-y-4">
                <EditField path="about.hero.heading" label="Hero Heading" value={content.about.hero.heading} />
                <EditField path="about.hero.subheading" label="Hero Subheading" value={content.about.hero.subheading} />
                <EditField path="about.content.title" label="Content Title" value={content.about.content.title} />
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">About Sections (one per line)</label>
                  {content.about.content.sections.map((section, idx) => (
                    <textarea
                      key={idx}
                      value={section}
                      onChange={(e) => {
                        const newSections = [...content.about.content.sections];
                        newSections[idx] = e.target.value;
                        updateContent("about.content.sections", newSections);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground resize-none"
                    />
                  ))}
                </div>
                <EditField path="about.whyDifferent.title" label="Why Different Title" value={content.about.whyDifferent.title} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Services Page Tab */}
          <TabsContent value="services-page" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Services Detail Page</h2>
              <div className="space-y-4">
                <EditField path="services.hero.heading" label="Hero Heading" value={content.services.hero.heading} />
                <EditField path="services.hero.subheading" label="Hero Subheading" value={content.services.hero.subheading} />

                {["masonry", "concrete", "outdoorLiving", "design"].map((serviceKey) => (
                  <div key={serviceKey} className="mt-6 p-4 bg-background rounded-lg border border-border">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-4 capitalize">
                      {serviceKey === "outdoorLiving" ? "Outdoor Living" : serviceKey}
                    </h3>
                    <div className="space-y-4">
                      <EditField
                        path={`services.sections.${serviceKey}.title`}
                        label="Title"
                        value={content.services.sections[serviceKey as keyof typeof content.services.sections].title}
                      />
                      <EditField
                        path={`services.sections.${serviceKey}.description`}
                        label="Description"
                        type="textarea"
                        value={content.services.sections[serviceKey as keyof typeof content.services.sections].description}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Gallery Page</h2>
              <div className="space-y-4">
                <EditField path="gallery.hero.heading" label="Hero Heading" value={content.gallery.hero.heading} />
                <EditField path="gallery.hero.subheading" label="Hero Subheading" value={content.gallery.hero.subheading} />

                <div className="mt-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-4">Projects</h3>
                  {content.gallery.projects.map((project, idx) => (
                    <div key={idx} className="p-4 bg-background rounded-lg border border-border mb-4">
                      <EditField
                        path={`gallery.projects.${idx}.title`}
                        label="Project Title"
                        value={project.title}
                      />
                      <EditField
                        path={`gallery.projects.${idx}.category`}
                        label="Category"
                        value={project.category}
                      />
                      <EditField
                        path={`gallery.projects.${idx}.description`}
                        label="Description"
                        type="textarea"
                        value={project.description}
                      />
                      <EditField
                        path={`gallery.projects.${idx}.afterImage`}
                        label="After Image URL"
                        value={project.afterImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Contact Page</h2>
              <div className="space-y-4">
                <EditField path="contact.hero.heading" label="Hero Heading" value={content.contact.hero.heading} />
                <EditField path="contact.hero.subheading" label="Hero Subheading" value={content.contact.hero.subheading} />
                <EditField path="contact.info.description" label="Description" type="textarea" value={content.contact.info.description} />
                <EditField path="contact.info.phone" label="Phone Number" value={content.contact.info.phone} />
                <EditField path="contact.info.email" label="Email Address" value={content.contact.info.email} />
                <EditField path="contact.info.address" label="Address" value={content.contact.info.address} />
                <EditField
                  path="contact.formFields.submitText"
                  label="Submit Button Text"
                  value={content.contact.formFields.submitText}
                />
                <EditField
                  path="contact.formFields.successMessage"
                  label="Success Message"
                  type="textarea"
                  value={content.contact.formFields.successMessage}
                />
              </div>
            </motion.div>
          </TabsContent>

          {/* Service Areas Tab */}
          <TabsContent value="service-areas" className="space-y-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface p-6 rounded-xl border border-border"
            >
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Service Areas</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">Service Areas (one per line)</label>
                  <div className="space-y-2">
                    {Array.isArray(content.contact.info.serviceAreas) &&
                      content.contact.info.serviceAreas.map((area, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={area}
                          onChange={(e) => {
                            const newAreas = [...content.contact.info.serviceAreas];
                            newAreas[idx] = e.target.value;
                            updateContent("contact.info.serviceAreas", newAreas);
                          }}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                          placeholder={`Service Area ${idx + 1}`}
                        />
                      ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newAreas = [...content.contact.info.serviceAreas, ""];
                    updateContent("contact.info.serviceAreas", newAreas);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  + Add Service Area
                </button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
