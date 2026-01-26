import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface SiteContent {
  // Home/Hero Section
  hero: {
    preHeading: string;
    mainHeading: string;
    subtitle: string;
    ctaText: string;
    phoneNumber: string;
  };

  // Trust Bar Section
  trustBar: {
    enabled: boolean;
    text: string;
    badgeText: string;
  };
  
  // About Page
  about: {
    hero: {
      heading: string;
      subheading: string;
    };
    content: {
      title: string;
      sections: string[];
    };
    whyDifferent: {
      title: string;
      points: string[];
    };
  };

  // Services Home Section
  servicesHome: {
    heading: string;
    subheading: string;
    items: Array<{
      name: string;
      description: string;
      category: string;
      categoryId: string;
    }>;
  };

  // Services Page
  services: {
    hero: {
      heading: string;
      subheading: string;
    };
    sections: {
      masonry: {
        title: string;
        description: string;
        services: Array<{ name: string; description: string }>;
      };
      concrete: {
        title: string;
        description: string;
        services: Array<{ name: string; description: string }>;
      };
      outdoorLiving: {
        title: string;
        description: string;
        services: Array<{ name: string; description: string }>;
      };
      design: {
        title: string;
        description: string;
        services: Array<{ name: string; description: string }>;
      };
    };
  };

  // Gallery Page
  gallery: {
    hero: {
      heading: string;
      subheading: string;
    };
    projects: Array<{
      id: string;
      title: string;
      category: string;
      description: string;
      beforeImage?: string;
      afterImage: string;
    }>;
  };

  // Contact Page
  contact: {
    hero: {
      heading: string;
      subheading: string;
    };
    info: {
      description: string;
      phone: string;
      email: string;
      address: string;
      serviceAreas: string[];
    };
    formFields: {
      submitText: string;
      successMessage: string;
    };
  };

  // Why Us Section
  whyUs: {
    heading: string;
    subheading: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };

  // Footer
  footer: {
    tagline: string;
    socialLinks?: Array<{ platform: string; url: string }>;
  };
}

const defaultContent: SiteContent = {
  hero: {
    preHeading: 'JN Masonry & Landscaping LLC',
    mainHeading: 'Professional Outdoor Living & Masonry Construction',
    subtitle: 'Trusted by homeowners for nearly two decades',
    ctaText: 'Request a Free Estimate',
    phoneNumber: '512 734 2958',
  },

  trustBar: {
    enabled: true,
    text: 'Trusted by homeowners for nearly two decades',
    badgeText: '20+ Years Experience',
  },

  servicesHome: {
    heading: 'Our Services',
    subheading: 'Outdoor construction done right',
    items: [
      { name: 'Masonry', description: 'Expert stone and brick work - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Masonry & Hardscaping', categoryId: 'masonry' },
      { name: 'Concrete', description: 'Durable concrete solutions - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Concrete Services', categoryId: 'concrete' },
      { name: 'Retaining Walls', description: 'Structural and decorative solutions - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Masonry & Hardscaping', categoryId: 'masonry' },
      { name: 'Fire Pits', description: 'Custom outdoor gathering spaces - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Outdoor Living', categoryId: 'outdoorLiving' },
      { name: 'Outdoor Kitchens', description: 'Fully equipped cooking areas - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Outdoor Living', categoryId: 'outdoorLiving' },
      { name: 'Flower Beds', description: 'Beautiful landscape design - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Outdoor Living', categoryId: 'outdoorLiving' },
      { name: 'Pergolas', description: 'Stylish shade structures - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Outdoor Living', categoryId: 'outdoorLiving' },
      { name: 'Lighting', description: 'Professional outdoor illumination - Liberty Hill TX, Austin TX, Round Rock TX, Georgetown TX, Leander TX', category: 'Design & Installation', categoryId: 'design' },
    ],
  },
  about: {
    hero: {
      heading: 'About JN Masonry & Landscaping LLC',
      subheading: 'Built on craftsmanship. Backed by experience.',
    },
    content: {
      title: 'Our Story',
      sections: [
        'JN Masonry & Landscaping LLC is a locally owned company serving Austin and surrounding areas. With nearly 20 years of hands-on experience, we specialize in masonry, concrete, and outdoor living construction.',
        'We plan carefully, work clean, and deliver professional results without shortcuts. Every project is designed to be functional, durable, and visually strong.',
        'Our team of skilled professionals is committed to bringing your vision to life while staying within budget and timeline. We focus on quality materials and craftsmanship that stands the test of time.',
      ],
    },
    whyDifferent: {
      title: 'Why Choose Us',
      points: [
        'Nearly 20 years of experience',
        'Local & reliable',
        'Honest pricing',
        'Clean, professional job sites',
        'Quality materials & workmanship',
        'Customer satisfaction focused',
      ],
    },
  },
  services: {
    hero: {
      heading: 'Our Services',
      subheading: 'Outdoor construction done right',
    },
    sections: {
      masonry: {
        title: 'Masonry & Hardscaping',
        description: 'Expert masonry and hardscape construction for lasting beauty and functionality.',
        services: [
          { name: 'Brick & Stone Masonry', description: 'Professional stone and brick installation' },
          { name: 'Patios & Walkways', description: 'Custom hardscape designs and installation' },
          { name: 'Retaining Walls', description: 'Structural and decorative wall solutions' },
          { name: 'Flagstone Work', description: 'Premium stone materials and expert installation' },
        ],
      },
      concrete: {
        title: 'Concrete Services',
        description: 'Durable concrete solutions for residential and commercial properties.',
        services: [
          { name: 'Concrete Slabs', description: 'Foundation and service slabs' },
          { name: 'Decorative Concrete', description: 'Stamped and colored finishes' },
          { name: 'Structural Concrete Work', description: 'Heavy-duty structural applications' },
        ],
      },
      outdoorLiving: {
        title: 'Outdoor Living',
        description: 'Create the perfect outdoor entertainment and living spaces.',
        services: [
          { name: 'Outdoor Kitchens', description: 'Fully equipped cooking and gathering areas' },
          { name: 'Pergolas', description: 'Stylish shade structures and outdoor covers' },
          { name: 'Flower Beds', description: 'Custom planting areas and landscaping features' },
          { name: 'Custom Outdoor Features', description: 'Fire pits, water features, and more' },
        ],
      },
      design: {
        title: 'Design & Installation',
        description: 'Professional design planning and expert installation services.',
        services: [
          { name: 'Outdoor Design Planning', description: 'Custom outdoor space planning and design' },
          { name: 'Full Installation Services', description: 'Expert installation by skilled craftsmen' },
          { name: 'Custom-Built Solutions', description: 'Tailored solutions for unique projects' },
        ],
      },
    },
  },
  gallery: {
    hero: {
      heading: 'Our Work',
      subheading: 'Real projects. Real results.',
    },
    projects: [
      {
        id: '1',
        title: 'Custom Stone Patio Installation',
        category: 'Masonry',
        description: 'Professional stone patio installation with custom design and premium materials',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F68deedf80d68434196bd2071622b80aa%2F52ebbb14aee949e7a9bb6b1788cda1b7?format=webp&width=800',
      },
      {
        id: '2',
        title: 'Stone Masonry & Hardscape',
        category: 'Masonry',
        description: 'Professional stone masonry with integrated hardscaping features and landscaping',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F68deedf80d68434196bd2071622b80aa%2Fd3727b8ebfa64e4ea47fcc29967bbd8c?format=webp&width=800',
      },
      {
        id: '3',
        title: 'Retaining Wall & Landscape Design',
        category: 'Masonry',
        description: 'Structural retaining wall with professional stone placement and landscape integration',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F68deedf80d68434196bd2071622b80aa%2Fd16b5cbead1542e2827de88e4bc44c52?format=webp&width=800',
      },
      {
        id: '4',
        title: 'Pool Deck Concrete Installation',
        category: 'Concrete',
        description: 'Professional concrete pool deck installation with proper slope and finishing',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Fda8c628691c2457ba9b1d6e2b730b7c9?format=webp&width=800',
      },
      {
        id: '5',
        title: '',
        category: 'Masonry',
        description: '',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F489dfeb5739e4ab58ec19bce96463163?format=webp&width=800',
      },
      {
        id: '6',
        title: 'Custom Stone Outdoor Kitchen',
        category: 'Outdoor Kitchen',
        description: 'Professional outdoor kitchen with stone masonry, stainless steel appliances, and custom countertops',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Fd51ae66ff2fb487ea06e05a6aea64847?format=webp&width=800',
      },
      {
        id: '6b',
        title: 'Built-in Outdoor Kitchen with Bar',
        category: 'Outdoor Kitchen',
        description: 'Fully equipped outdoor kitchen with grill, sink, storage, and seating area',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Fb255c62f8539464b86a5736fa82efc0f?format=webp&width=800',
      },
      {
        id: '6c',
        title: 'Luxury Outdoor Kitchen & Entertaining Space',
        category: 'Outdoor Kitchen',
        description: 'Premium outdoor kitchen with stone construction, multiple cooking stations, and integrated seating',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F4b7500eb8b0042f5b96c6208056f954c?format=webp&width=800',
      },
      {
        id: '6d',
        title: 'Modern Outdoor Kitchen & Bar Area',
        category: 'Outdoor Kitchen',
        description: 'Contemporary outdoor kitchen with stone masonry, built-in grill, and entertaining counter',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F0f4515b1882a4fc6801257676d6e2b55?format=webp&width=800',
      },
      {
        id: '7',
        title: 'Fire Pit & Seating Area',
        category: 'Fire Pit',
        description: 'Custom fire pit with surrounding seating area for outdoor gatherings',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F68deedf80d68434196bd2071622b80aa%2F3fdc35f6f286485e8b977bfa0909b814?format=webp&width=800',
      },
      {
        id: '7b',
        title: 'Circular Fire Pit Installation',
        category: 'Fire Pit',
        description: 'Professional circular fire pit with concrete ring and landscape integration',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F68deedf80d68434196bd2071622b80aa%2F1129e1fb7abf4486a18099b2458c1e98?format=webp&width=800',
      },
      {
        id: '8',
        title: 'Backyard Landscape Transformation',
        category: 'Landscaping',
        description: 'Complete backyard transformation with lawn sodding and landscape design',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F6132a506b1af4d178103d6046bbd5a9a?format=webp&width=800',
      },
      {
        id: '8b',
        title: 'Landscape Maintenance & Mulch Installation',
        category: 'Landscaping',
        description: 'Professional landscape maintenance with decorative mulch and plant arrangement',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F1c2f3fd0a32d4b8f8c3b4ecfc30c9083?format=webp&width=800',
      },
      {
        id: '8c',
        title: 'Hardscape & Landscaping Installation',
        category: 'Landscaping',
        description: 'Integrated hardscape with professional landscape design and stone borders',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F85c7e1e3a2b944879cd0ab57e24ade84?format=webp&width=800',
      },
      {
        id: '8d',
        title: 'Pathway & Landscape Design',
        category: 'Landscaping',
        description: 'Beautiful landscape pathway with professional lawn and plant design',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F4d1db1495a5a4e44b7056841db07803e?format=webp&width=800',
      },
      {
        id: '8e',
        title: 'Tree Planting & Landscape Design',
        category: 'Landscaping',
        description: 'Premium tree planting with comprehensive landscape design and layout',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F1dfa40bde3e5446284d289dbf0116460?format=webp&width=800',
      },
      {
        id: '8f',
        title: 'Outdoor Space Design & Development',
        category: 'Landscaping',
        description: 'Professional outdoor space design with modern hardscape and landscaping',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Fce0518844c564375880032ff25c3e662?format=webp&width=800',
      },
      {
        id: '8g',
        title: 'Residential Landscape Construction',
        category: 'Landscaping',
        description: 'Full residential landscape construction with modern design principles',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F09814729e7734fa39313cb73277471a4?format=webp&width=800',
      },
      {
        id: '8h',
        title: 'Lawn Renovation & Landscape Upgrade',
        category: 'Landscaping',
        description: 'Complete lawn renovation with upgraded landscape features and design',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Fe4bafcadc4284722ab87f8dd0f89bcf8?format=webp&width=800',
      },
      {
        id: '8i',
        title: 'Modern Landscape & Garden Design',
        category: 'Landscaping',
        description: 'Contemporary landscape design with modern garden features and planting',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2Ff9a28f63404e45f9ac67567810c57121?format=webp&width=800',
      },
      {
        id: '9',
        title: 'Concrete Pad & Foundation Installation',
        category: 'Concrete',
        description: 'Professional concrete pad installation with proper grading and finishing',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F87a9fe20badb437683c8d50a4dd72bf7?format=webp&width=800',
      },
      {
        id: '9b',
        title: 'Decorative Concrete Installation',
        category: 'Concrete',
        description: 'Professional decorative concrete with stamped pattern and finishing',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F6bc42e1599eb4956a078a7768654e24c?format=webp&width=800',
      },
      {
        id: '9c',
        title: 'Concrete Patio & Outdoor Space',
        category: 'Concrete',
        description: 'Complete concrete patio installation with professional finishing and design',
        afterImage: 'https://cdn.builder.io/api/v1/image/assets%2F77ef21fef6af4bdfa4cabdc5d88656f2%2F2622fb986c3449cca81cb2a57fe19dd8?format=webp&width=800',
      },
    ],
  },
  contact: {
    hero: {
      heading: 'Contact Us',
      subheading: 'Let\'s build your outdoor space',
    },
    info: {
      description: 'Ready to transform your outdoor space? Contact us today for a free, no-obligation quote.',
      phone: '512 734 2958',
      email: 'jnmscapes@gmail.com',
      address: 'Austin, TX',
      serviceAreas: [ 'Liberty Hill', 'Austin', 'Round Rock', 'Georgetown', 'Leander' ],
    },
    formFields: {
      submitText: 'Submit Request',
      successMessage: 'Quote request sent! We\'ll get back to you within 24 hours.',
    },
  },
  whyUs: {
    heading: 'Why Choose JN Masonry & Landscaping',
    subheading: 'Here\'s what makes us the right choice for your outdoor construction project',
    items: [
      {
        title: 'Nearly 20 Years of Experience',
        description: 'Decades of hands-on experience in masonry, concrete, and outdoor living construction.',
      },
      {
        title: 'Local & Reliable',
        description: 'Based right here in Central Texas. We\'re your neighbors, committed to our community.',
      },
      {
        title: 'Honest Pricing',
        description: 'Transparent quotes with no hidden fees. Competitive rates without compromising quality.',
      },
      {
        title: 'Clean & Professional',
        description: 'We maintain professional job sites and leave your property looking its best.',
      },
    ],
  },

  footer: {
    tagline: 'Professional Masonry & Landscaping. Serving Austin & Central Texas',
  },
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (path: string, value: any) => void;
  resetContent: () => void;
  exportContent: () => string;
  importContent: (data: string) => void;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('jn-masonry-content');
    if (stored) {
      try {
        setContent(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load content from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('jn-masonry-content', JSON.stringify(content));
  }, [content]);

  const updateContent = (path: string, value: any) => {
    setContent((prev) => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('jn-masonry-content');
  };

  const exportContent = () => {
    return JSON.stringify(content, null, 2);
  };

  const importContent = (data: string) => {
    try {
      const imported = JSON.parse(data);
      setContent(imported);
    } catch (e) {
      console.error('Failed to import content', e);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, exportContent, importContent }}>
      {children}
    </ContentContext.Provider>
  );
};
