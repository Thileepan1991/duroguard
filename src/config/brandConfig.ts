// Brand Configuration for Ferrolux Architectural Steel & Stainless Doors
// Fully configurable brand identity, contacts, showrooms, and WhatsApp concierge

export interface BrandConfig {
  brandName: string;
  brandTagline: string;
  subTitle: string;
  foundingYear: number;
  contact: {
    phone: string;
    email: string;
    whatsappNumber: string; // international format without + or spaces for api.whatsapp.com
    whatsappDisplay: string;
    headquarters: string;
    hours: string;
  };
  socials: {
    instagram: string;
    architecturalDigest: string;
    linkedin: string;
    youtube: string;
  };
  showrooms: {
    city: string;
    country: string;
    address: string;
    phone: string;
    leadArchitect: string;
    status: 'Flagship Studio' | 'Design Atelier' | 'Experience Center';
  }[];
  palette: {
    charcoalSlate: string;
    silverStainless: string;
    industrialSteel: string;
    architecturalGold: string;
    deepObsidian: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  brandName: "FERROLUX",
  brandTagline: "Monumental Steel & Stainless Portals",
  subTitle: "Industrial Precision. Architectural Majesty.",
  foundingYear: 1988,
  contact: {
    phone: "+44 (0) 20 7946 0888",
    email: "concierge@ferrolux-doors.com",
    whatsappNumber: "442079460888",
    whatsappDisplay: "+44 20 7946 0888",
    headquarters: "Atelier 12, Industrial Design District, Zurich & London",
    hours: "Monday – Saturday: 08:30 – 19:30 CET"
  },
  socials: {
    instagram: "https://instagram.com",
    architecturalDigest: "https://architecturaldigest.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  showrooms: [
    {
      city: "Zurich",
      country: "Switzerland",
      address: "Gotthardstrasse 28, 8002 Zürich",
      phone: "+41 44 280 4400",
      leadArchitect: "Lukas Von Berg",
      status: "Flagship Studio"
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "14 Berkeley Square, Mayfair, London W1J 6BQ",
      phone: "+44 20 7946 0888",
      leadArchitect: "Eleanor Vance, RIBA",
      status: "Flagship Studio"
    },
    {
      city: "Dubai",
      country: "United Arab Emirates",
      address: "Building 4, Dubai Design District (d3)",
      phone: "+971 4 360 8822",
      leadArchitect: "Tariq Al-Mansoor",
      status: "Design Atelier"
    },
    {
      city: "New York",
      country: "United States",
      address: "482 Broome Street, SoHo, NY 10013",
      phone: "+1 212 555 0198",
      leadArchitect: "Julian Sterling, AIA",
      status: "Experience Center"
    },
    {
      city: "Milan",
      country: "Italy",
      address: "Via Montenapoleone 18, 20121 Milano",
      phone: "+39 02 876 5432",
      leadArchitect: "Matteo Rossi",
      status: "Design Atelier"
    },
    {
      city: "Mumbai",
      country: "India",
      address: "Bandra Kurla Complex, G-Block, Mumbai 400051",
      phone: "+91 22 6123 9000",
      leadArchitect: "Aditya Singhania",
      status: "Experience Center"
    }
  ],
  palette: {
    charcoalSlate: "#0c0e12",
    silverStainless: "#e2e8f0",
    industrialSteel: "#838d99",
    architecturalGold: "#d4af37",
    deepObsidian: "#060709"
  }
};
