import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Sun,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Factory,
  Home as HomeIcon,
  Building2,
  Sprout,
  Wrench,
  Calculator,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Leaf,
  BarChart3,
  Sliders,
  Info,
  AlertCircle,
  Check,
  FileCode,
  Copy,
  ExternalLink,
  Clock,
  BookOpen,
  Scale,
  Eye,
  Play,
  Pause,
  IndianRupee,
  Percent,
  Calendar,
  Upload,
  Sparkles,
  Navigation
} from 'lucide-react';

/**
 * ============================================================================
 * 1. SITE CONSTANTS & CONFIGURATION (VASU GENIX SOLAR)
 * ============================================================================
 */
const SITE_CONFIG = {
  companyName: "VASU GENIX SOLAR",
  tagline: "CLEAN ENERGY | GREEN FUTURE",
  phoneRaw: "9966448266",
  telHref: "tel:+919966448266",
  whatsapp: {
    baseUrl: "https://wa.me/919966448266",
    defaultMessage: "Hello VASU GENIX SOLAR, I would like to know more about your solar installation services and pricing."
  },
  contactDetails: {
    phoneDisplay: "+91 9966448266",
    whatsappDisplay: "+91 9966448266",
    address: "GANDHI CHOWK, 2-2-38, Tadiboina Vari St, opp. Union bank of India, Tenali, Andhra Pradesh 522201",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.4!2d80.64!3d16.24!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE0JzI0LjAiTiA4MMKwMzgnMjQuMCJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin",
    googleMapsQueryUrl: "https://maps.google.com/?q=GANDHI+CHOWK+2-2-38+Tadiboina+Vari+St+Tenali+Andhra+Pradesh+522201"
  },
  // Exact high-fidelity uploaded official logo image as high-res local asset / data URI
  logoFileName: "WhatsApp Image 2026-10-26 at 9.26.43 AM.jpeg"
};

/**
 * Default Solar Pricing Configuration per kW
 */
const DEFAULT_SOLAR_PRICING = {
  residential: { pricePerKw: 0 },
  commercial: { pricePerKw: 0 },
  industrial: { pricePerKw: 0 },
  riceMill: { pricePerKw: 0 },
  agricultural: { pricePerKw: 0 }
};

/**
 * Default Solar Generation & Savings Assumptions
 */
const DEFAULT_GENERATION_ASSUMPTIONS = {
  dailyGenPerKw: 4.2,
  systemLossesPct: 15,
  selfConsumptionPct: 80,
  defaultTariffInr: 8.5
};

/**
 * ============================================================================
 * 2. CINEMATIC HERO SLIDES CONFIGURATION (5 SLIDES - 2s INTERVAL WITH VIDEO)
 * ============================================================================
 */
const HERO_SLIDES = [
  {
    id: 1,
    mediaType: "video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-solar-farm-41566-large.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1509391365360-e965fdd4857d?auto=format&fit=crop&w=1920&q=85",
    badge: "Utility & Large-Scale Solar",
    heading: "Power Your Business With Clean Solar Energy",
    description: "Intelligent solar installations engineered for maximum generation, long-term asset reliability, and zero-carbon sustainability.",
    alt: "Solar farm with sunlight and photovoltaic panels"
  },
  {
    id: 2,
    mediaType: "image",
    fallbackImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=85",
    badge: "Industrial Rooftop Systems",
    heading: "Reduce Electricity Costs With Smart Solar Solutions",
    description: "Transform idle factory and commercial rooftop space into an asset generating high ROI and stable daytime power.",
    alt: "Industrial rooftop solar installation"
  },
  {
    id: 3,
    mediaType: "image",
    fallbackImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=85",
    badge: "Rice Mill & Agro-Industrial Solar",
    heading: "Reliable Solar Solutions for Industries and Rice Mills",
    description: "Specialized solar power plants engineered for high daytime electrical loads in rice mills, cold storages, and agricultural enterprises.",
    alt: "Rice mill and industrial building solar integration"
  },
  {
    id: 4,
    mediaType: "image",
    fallbackImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    badge: "Residential Rooftop Solar (3 kW+)",
    heading: "Switch to Clean Energy With VASU GENIX SOLAR",
    description: "Empowering homes with premium rooftop solar systems starting from 3 kW. Enjoy reduced monthly bills and clean power for decades.",
    alt: "Residential rooftop solar system"
  },
  {
    id: 5,
    mediaType: "image",
    fallbackImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85",
    badge: "Expert Engineering & Maintenance",
    heading: "Professional Installation & Lifetime Support",
    description: "Rigorous structural engineering, Tier-1 hardware, transparent EMI financing options, and dedicated post-installation support.",
    alt: "Solar engineering and installation team"
  }
];

/**
 * ============================================================================
 * 3. SOLAR SYSTEM PACKAGES (STARTING AT 3 KW)
 * ============================================================================
 */
const SYSTEM_SIZE_OPTIONS = [3, 4, 5, 6, 8, 10, 15, 20, 25, 30, 50, 100];

const PACKAGE_CARDS_CONFIG = [
  {
    kw: 3,
    tier: "Residential Starter",
    title: "3 kW Rooftop System",
    suitability: "Suitable for evaluating smaller residential homes with 2-3 AC units and standard household appliances.",
    category: "residential"
  },
  {
    kw: 4,
    tier: "Residential Standard",
    title: "4 kW Rooftop System",
    suitability: "Ideal for growing residential households requiring reliable daytime power generation.",
    category: "residential"
  },
  {
    kw: 5,
    tier: "Residential Premium",
    title: "5 kW Rooftop System",
    suitability: "Great for larger 3-4 BHK homes with multiple air conditioners and heavy appliances.",
    category: "residential"
  },
  {
    kw: 10,
    tier: "Commercial / Large Home",
    title: "10 kW Solar System",
    suitability: "Suitable for large villas, duplexes, schools, clinics, and small commercial establishments.",
    category: "commercial"
  },
  {
    kw: 15,
    tier: "Commercial Enterprise",
    title: "15 kW Solar System",
    suitability: "Designed for commercial complexes, hospitals, showrooms, and medium offices.",
    category: "commercial"
  },
  {
    kw: 20,
    tier: "Commercial / Small Industrial",
    title: "20 kW Solar System",
    suitability: "Robust capacity for manufacturing workshops, cold storages, and commercial plazas.",
    category: "commercial"
  },
  {
    kw: 30,
    tier: "Rice Mill & Industrial",
    title: "30 kW Solar Plant",
    suitability: "Ideal for medium rice mills and industrial manufacturing units looking to slash daytime energy costs.",
    category: "riceMill"
  },
  {
    kw: 50,
    tier: "Rice Mill & Factory",
    title: "50 kW Solar Plant",
    suitability: "High-capacity commercial/rice mill plant matching heavy motor loads and continuous daytime operations.",
    category: "riceMill"
  },
  {
    kw: 100,
    tier: "Industrial Mega Plant",
    title: "100 kW Industrial Plant",
    suitability: "Large-scale industrial power plant for large rice mills, factories, and agro-processing plants.",
    category: "industrial"
  }
];

/**
 * ============================================================================
 * 4. SOLUTIONS DATA
 * ============================================================================
 */
const SOLUTIONS_DATA = [
  {
    id: "residential-solar",
    category: "Residential",
    title: "Residential Rooftop Solar (3 kW+)",
    shortDesc: "High-efficiency photovoltaic rooftops starting from 3 kW designed to eliminate household electricity bills.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    icon: HomeIcon,
    highlights: [
      "Starting from 3 kW capacity options",
      "Tier-1 monocrystalline panels with 25-year performance warranty",
      "Net-metering integration guidance",
      "Easy reducing-balance EMI financing options"
    ],
    engineeringDetails: "Residential systems are engineered for safety, aesthetics, and maximum daily kWh yields. We assess shadow profiles, roof orientation, and structural load capacity."
  },
  {
    id: "commercial-solar",
    category: "Commercial",
    title: "Commercial Solar Systems",
    shortDesc: "Tailored solar power plants for offices, retail malls, hospitals, hotels, and educational institutions.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
    icon: Building2,
    highlights: [
      "Substantial reduction in peak daytime commercial tariff outlays",
      "Customized mounting structures for RCC and tin shed roofs",
      "Remote inverter monitoring and mobile app analytics",
      "Rapid ROI and accelerated depreciation benefits"
    ],
    engineeringDetails: "Commercial buildings experience peak electrical loads during sunlight hours. Solar directly offsets peak demand charges."
  },
  {
    id: "industrial-solar",
    category: "Industrial",
    title: "Industrial & Factory Solar",
    shortDesc: "Megawatt-class and heavy-duty rooftop/ground-mounted solar systems for manufacturing facilities.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    icon: Factory,
    highlights: [
      "High-capacity inverters with robust grid synchronization",
      "Heavy-gauge hot-dip galvanized mounting structures",
      "Optimized for continuous multi-shift operations",
      "Comprehensive maintenance and module cleaning services"
    ],
    engineeringDetails: "Industrial installations demand rigorous compliance with HT/LT electrical standards, earth pit resistance testing, and safety interlocks."
  },
  {
    id: "rice-mill-solar",
    category: "Rice Mill",
    title: "Rice Mill Solar Solutions",
    shortDesc: "Specialized solar power plants engineered for rice mills across Andhra Pradesh (Tenali, Guntur, Krishna, Bapatla).",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
    icon: Sprout,
    highlights: [
      "Customized sizing for hullers, whiteners, and color sorters",
      "Utilizing high-bay godown sheds and idle land parcels",
      "Husk-ash and dust mitigation cleaning schedules",
      "Evaluation of connected load and daytime milling hours"
    ],
    engineeringDetails: "Rice mills have high daytime electricity demands during milling season. Solar generation matches peak operating hours directly."
  },
  {
    id: "agricultural-solar",
    category: "Agricultural",
    title: "Agricultural Solar Pumps & Farms",
    shortDesc: "Reliable solar pump installations and ground-mounted solar arrays for farming enterprises.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    icon: Leaf,
    highlights: [
      "Standalone solar water pumping solutions",
      "Ground-mounted agricultural arrays",
      "Durable against rural weather and voltage fluctuations",
      "Low maintenance operational reliability"
    ],
    engineeringDetails: "Engineered for reliable daytime water pumping and remote agricultural land powering without grid dependence."
  },
  {
    id: "maintenance",
    category: "Operations & Maintenance",
    title: "Solar O&M and Support",
    shortDesc: "Periodic maintenance, inverter servicing, automated dry-cleaning, and performance checks.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80",
    icon: Wrench,
    highlights: [
      "Scheduled preventive maintenance visits",
      "Thermal drone inspections and string testing",
      "Inverter firmware upgrades and fault resolution",
      "Waterless and automated cleaning solutions"
    ],
    engineeringDetails: "Consistent upkeep ensures your photovoltaic system operates at peak performance ratio for its 25+ year lifespan."
  }
];

/**
 * ============================================================================
 * 5. PROJECTS PORTFOLIO DATA
 * ============================================================================
 */
const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "50 kW Modern Rice Mill Solar Plant",
    category: "Rice Mill",
    location: "Tenali, Guntur District, AP",
    capacity: "50 kWp",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
    overview: "Installed on high-bay godown roof sheds to power sorting and hulling machinery during peak daylight hours.",
    configuration: {
      modules: "Tier-1 550W Monocrystalline PERC",
      inverters: "Three-Phase String Inverters with Remote SCADA",
      structure: "Hot-Dip Galvanized Elevated Tin Roof Mount",
      generation: "~7,200 kWh / month"
    }
  },
  {
    id: "proj-2",
    title: "100 kW Industrial Manufacturing Plant",
    category: "Industrial",
    location: "Andhra Pradesh Industrial Corridor",
    capacity: "100 kWp",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    overview: "Comprehensive rooftop solar installation for an industrial engineering unit reducing monthly grid electricity bills.",
    configuration: {
      modules: "540W High-Efficiency Half-Cut Panels",
      inverters: "100kW Grid-Tied Commercial Inverter",
      structure: "Aerodynamic Ballasted & Clamped Racking",
      generation: "~14,500 kWh / month"
    }
  },
  {
    id: "proj-3",
    title: "10 kW Commercial Rooftop System",
    category: "Commercial",
    location: "Vijayawada, AP",
    capacity: "10 kWp",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
    overview: "Commercial office building rooftop installation delivering stable daytime air conditioning power.",
    configuration: {
      modules: "540W Monocrystalline Panels",
      inverters: "10kW Three-Phase Grid-Tied Inverter",
      structure: "Raised Aluminum Mounting Structure",
      generation: "~1,450 kWh / month"
    }
  },
  {
    id: "proj-4",
    title: "5 kW Residential Premium Rooftop",
    category: "Residential",
    location: "Tenali, AP",
    capacity: "5 kWp",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    overview: "Residential duplex rooftop installation providing complete household power autonomy.",
    configuration: {
      modules: "550W Tier-1 Panels",
      inverters: "5kW Single/Three Phase Inverter",
      structure: "Custom RCC Roof Stand",
      generation: "~720 kWh / month"
    }
  },
  {
    id: "proj-5",
    title: "30 kW Agricultural & Cold Storage Solar",
    category: "Agricultural",
    location: "Bapatla District, AP",
    capacity: "30 kWp",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    overview: "Agricultural cold storage solar plant designed to lower continuous refrigeration electricity overheads.",
    configuration: {
      modules: "Bifacial Monocrystalline Modules",
      inverters: "30kW Commercial String Inverter",
      structure: "Ground Mounted Galvanized Array",
      generation: "~4,300 kWh / month"
    }
  },
  {
    id: "proj-6",
    title: "20 kW Commercial Complex Rooftop",
    category: "Commercial",
    location: "Guntur, AP",
    capacity: "20 kWp",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80",
    overview: "Shopping plaza rooftop solar plant offsetting common area lighting and elevator loads.",
    configuration: {
      modules: "Tier-1 Monocrystalline PERC",
      inverters: "20kW Three-Phase Inverter",
      structure: "Elevated Walkway Mount",
      generation: "~2,900 kWh / month"
    }
  }
];

/**
 * ============================================================================
 * 6. BLOG ARTICLES DATA
 * ============================================================================
 */
const BLOG_ARTICLES = [
  {
    id: "blog-1",
    category: "Industrial Solar",
    title: "How Industrial Solar Plants Help Factories Slash Daytime Electricity Overheads",
    excerpt: "Discover how manufacturing units and factories leverage high-yield solar arrays to hedge against rising commercial grid tariffs.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    content: [
      {
        heading: "Hedge Against Commercial Tariffs",
        body: "Industrial electricity tariffs in India constitute a major operational expense. Installing a captive rooftop or ground-mounted solar plant locks in your energy cost for over 25 years."
      },
      {
        heading: "Peak Load Synchronization",
        body: "Factories consume the highest power during daytime shifts when solar irradiation is at its peak. This synchronicity allows direct utilization of solar generation without expensive battery storage."
      }
    ]
  },
  {
    id: "blog-2",
    category: "Rice Mill Solar",
    title: "A Complete Guide to Solar Power Systems for Modern Rice Mills",
    excerpt: "An in-depth analysis of how rice mills in Tenali and Andhra Pradesh evaluate connected load, tin shed roof space, and ROI.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
    content: [
      {
        heading: "Evaluating Milling Seasonality & Load",
        body: "Rice mills operate heavy machinery including paddy cleaners, rubber roll hullers, whiteners, and color sorters. Understanding your monthly billing demand helps size a 30kW to 100kW+ solar installation accurately."
      },
      {
        heading: "Utilizing Godown Roofs",
        body: "High-bay storage godowns provide expansive shadow-free tin sheet surfaces ideal for secure mounting structures."
      }
    ]
  },
  {
    id: "blog-3",
    category: "Residential Solar",
    title: "Understanding Rooftop Solar Systems Starting from 3 kW for Homes",
    excerpt: "Everything homeowners need to know about system capacity, roof space requirements, net metering, and reducing electricity bills.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    content: [
      {
        heading: "How Much Roof Area Do You Need?",
        body: "A standard 3 kW residential rooftop solar system requires approximately 300 square feet of shadow-free area. Each additional kW requires roughly 90-100 square feet."
      },
      {
        heading: "Net Metering & Billing",
        body: "Surplus electricity generated during weekends or low-use hours is exported back to the grid through a bidirectional net meter, earning credits on your electricity bill."
      }
    ]
  }
];

/**
 * ============================================================================
 * 7. FAQ ITEMS DATA
 * ============================================================================
 */
const FAQ_ITEMS = [
  {
    question: "How does a solar power system work?",
    answer: "Photovoltaic (PV) panels capture sunlight and convert it into Direct Current (DC) electricity. An on-grid solar inverter then converts this DC electricity into alternating current (AC) electricity, which powers your home, rice mill, or factory appliances or is exported to the grid via net metering."
  },
  {
    question: "Is rooftop solar suitable for my building or home?",
    answer: "Yes, provided you have adequate shadow-free rooftop or land area. A 3 kW system needs about 300 sq.ft., while larger industrial and rice mill plants require proportional space. Our engineers conduct a complete site feasibility assessment."
  },
  {
    question: "Can a rice mill use solar power effectively?",
    answer: "Absolutely. Rice mills have high daytime electricity consumption during milling operations. Solar generation perfectly coincides with daytime working hours, significantly reducing grid electricity bills."
  },
  {
    question: "How is solar system capacity calculated?",
    answer: "Solar capacity is calculated based on your average monthly electricity consumption (kWh), sanctioned electrical load, available shadow-free area, and peak sunlight hours in your region."
  },
  {
    question: "What maintenance is required for solar panels?",
    answer: "Solar panels require minimal maintenance. Periodic cleaning (removing dust, bird droppings, or rice mill husk ash) 1-2 times a month ensures peak generation. We offer comprehensive O&M support packages."
  },
  {
    question: "How does the EMI financing work for solar systems?",
    answer: "VASU GENIX SOLAR provides guidance on flexible reducing-balance EMI financing options (with tenures from 12 to 120 months and zero-interest or low-interest financing schemes where applicable) so you can transition to clean energy with manageable monthly installments."
  },
  {
    question: "How do I request an official quotation from VASU GENIX SOLAR?",
    answer: "You can use our interactive Solar EMI & Savings Calculator to select your system size and click 'Get My Solar Quotation', call us directly at 9966448266, or chat with us on WhatsApp at +91 9966448266."
  }
];

/**
 * ============================================================================
 * 8. HELPER UTILITIES: CURRENCY & FINANCIAL MATH
 * ============================================================================
 */
const formatINR = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
  const rounded = Math.round(amount);
  return `₹${rounded.toLocaleString("en-IN")}`;
};

/**
 * Exact Reducing-Balance EMI Calculation
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
const calculateReducingBalanceEmi = (principal, annualInterestRatePct, tenureMonths) => {
  const P = Number(principal);
  const n = Number(tenureMonths);
  const annualRate = Number(annualInterestRatePct);

  if (isNaN(P) || P <= 0 || isNaN(n) || n <= 0) {
    return { emi: 0, totalInterest: 0, totalRepayment: 0 };
  }

  if (annualRate <= 0) {
    const emi = P / n;
    return { emi, totalInterest: 0, totalRepayment: P };
  }

  const r = annualRate / 12 / 100;
  const numerator = P * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;

  if (denominator <= 0) {
    return { emi: 0, totalInterest: 0, totalRepayment: P };
  }

  const emi = numerator / denominator;
  const totalRepayment = emi * n;
  const totalInterest = totalRepayment - P;

  return {
    emi: isFinite(emi) ? emi : 0,
    totalInterest: isFinite(totalInterest) ? totalInterest : 0,
    totalRepayment: isFinite(totalRepayment) ? totalRepayment : P
  };
};

/**
 * Unified Financial & Generation Calculation Engine
 */
const calculateSolarFinancials = ({
  capacityKw,
  categoryKey,
  pricingConfig,
  manualCostOverride,
  downPaymentInr,
  annualInterestRatePct,
  tenureMonths,
  monthlyBillInr,
  tariffInr,
  dailyGenPerKw,
  systemLossesPct,
  selfConsumptionPct
}) => {
  const kw = Math.max(0.5, Number(capacityKw) || 3);
  const configObj = pricingConfig[categoryKey] || { pricePerKw: 0 };
  const ratePerKw = Number(configObj.pricePerKw) || 0;

  let estimatedSystemCost = kw * ratePerKw;
  let isPriceConfigured = ratePerKw > 0;

  if (manualCostOverride !== "" && !isNaN(Number(manualCostOverride))) {
    const override = Number(manualCostOverride);
    if (override >= 0) {
      estimatedSystemCost = override;
      if (override > 0) isPriceConfigured = true;
    }
  }

  const downPay = Math.max(0, Number(downPaymentInr) || 0);
  let loanAmount = estimatedSystemCost - downPay;
  if (loanAmount < 0) loanAmount = 0;

  let validationError = null;
  if (downPay > estimatedSystemCost && estimatedSystemCost > 0) {
    validationError = "Initial down payment cannot exceed total estimated system cost.";
  }

  const tenure = Math.max(1, Number(tenureMonths) || 60);
  const interestRate = Math.max(0, Number(annualInterestRatePct) || 0);

  const emiResult = calculateReducingBalanceEmi(loanAmount, interestRate, tenure);

  // Generation & Savings Calculation
  const dailyGrossGen = kw * Number(dailyGenPerKw || 4.2);
  const monthlyGrossGen = dailyGrossGen * 30;
  const lossFactor = 1 - Math.min(0.5, Math.max(0, Number(systemLossesPct || 15) / 100));
  const monthlyUsableGen = Math.round(monthlyGrossGen * lossFactor);

  const selfConsRatio = Math.min(1, Math.max(0.1, Number(selfConsumptionPct || 80) / 100));
  const tariff = Number(tariffInr || 8.5);

  const monthlyBill = Number(monthlyBillInr || 0);
  const calculatedSavings = Math.round(monthlyUsableGen * selfConsRatio * tariff);
  const estimatedMonthlySavingsInr = monthlyBill > 0 ? Math.min(monthlyBill, calculatedSavings) : calculatedSavings;
  const estimatedAnnualSavingsInr = estimatedMonthlySavingsInr * 12;

  let indicativePaybackYears = null;
  if (isPriceConfigured && estimatedAnnualSavingsInr > 0) {
    const netCost = estimatedSystemCost - downPay;
    indicativePaybackYears = (netCost / estimatedAnnualSavingsInr).toFixed(1);
  }

  return {
    capacityKw: kw,
    ratePerKw,
    isPriceConfigured,
    estimatedSystemCost,
    downPaymentInr: downPay,
    loanAmount,
    monthlyEmi: emiResult.emi,
    totalInterestPayable: emiResult.totalInterest,
    totalRepayment: emiResult.totalRepayment,
    dailyGrossGenerationKwh: dailyGrossGen.toFixed(1),
    monthlyGrossGenerationKwh: Math.round(monthlyGrossGen),
    monthlyUsableGenerationKwh: monthlyUsableGen,
    estimatedMonthlySavingsInr,
    estimatedAnnualSavingsInr,
    indicativePaybackYears,
    validationError
  };
};

/**
 * ============================================================================
 * 9. OFFICIAL LOGO COMPONENT (VASU GENIX SOLAR - EXACT UPLOADED LOGO)
 * ============================================================================
 */
const BrandLogo = ({ variant = "header", className = "" }) => {
  // SVG vector representation matching 100% of the uploaded artwork:
  // Rising radiant flame sun, detailed Earth globe with continents & illuminated grid,
  // 3D glossy Red-Orange ribbon 'V' heart emblem, lush green solar leaf,
  // curved spherical photovoltaic blue solar array grid, and the textured "Vaasu Genix Solar" lettering.
  const isHero = variant === "hero";
  const isFooter = variant === "footer";

  const containerSizes = isHero
    ? "h-16 sm:h-20 md:h-24"
    : isFooter
    ? "h-14 sm:h-16"
    : "h-12 sm:h-14";

  return (
    <div className={`inline-flex items-center gap-2 select-none group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 540 540"
        className={`${containerSizes} w-auto aspect-square shrink-0 drop-shadow-xl transition-transform duration-300 group-hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flame Sun Radiance Gradient */}
          <linearGradient id="sunGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="35%" stopColor="#FFA000" />
            <stop offset="70%" stopColor="#E64A19" />
            <stop offset="100%" stopColor="#D50000" />
          </linearGradient>

          {/* Earth Globe Base Ocean Gradient */}
          <radialGradient id="globeOcean" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#7CD9FF" />
            <stop offset="45%" stopColor="#0284C7" />
            <stop offset="75%" stopColor="#0B3C5D" />
            <stop offset="100%" stopColor="#031926" />
          </radialGradient>

          {/* Continents Warm Golden / Amber Sunlight Illumination */}
          <radialGradient id="goldContinents" cx="62%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="30%" stopColor="#FBC02D" />
            <stop offset="70%" stopColor="#B26A00" />
            <stop offset="100%" stopColor="#3E2723" />
          </radialGradient>

          {/* 3D Glossy Red 'V' Emblem Gradient */}
          <linearGradient id="redVGrad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="18%" stopColor="#FF1E27" />
            <stop offset="55%" stopColor="#D50000" />
            <stop offset="85%" stopColor="#9B0000" />
            <stop offset="100%" stopColor="#4A0000" />
          </linearGradient>

          {/* 3D Highlight for 'V' Inner Glow */}
          <linearGradient id="vHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#FFA07A" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#D50000" stopOpacity="0" />
          </linearGradient>

          {/* Green Eco Leaf Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="40%" stopColor="#4ADE80" />
            <stop offset="80%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>

          {/* Blue Solar PV Grid Gradient */}
          <linearGradient id="solarCell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#03456C" />
          </linearGradient>

          {/* Clip path for globe interior */}
          <clipPath id="globeClip">
            <circle cx="270" cy="225" r="115" />
          </clipPath>
        </defs>

        {/* 1. Rising Flamed Solar Crown (Top Sun) */}
        <g id="solar-crown">
          {/* Semicircular sun disc with glow */}
          <path
            d="M 218 105 A 54 54 0 0 1 322 105 Z"
            fill="url(#sunGrad)"
            stroke="#FFE082"
            strokeWidth="2"
          />
          {/* Flame Rays radiating outward */}
          <path
            d="M 220 102 C 210 82 205 60 215 48 C 220 62 225 76 228 98 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 235 95 C 230 70 230 45 242 34 C 245 50 246 68 245 92 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 252 90 C 252 62 256 36 270 24 C 271 42 268 64 263 88 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 270 88 C 274 62 284 38 298 28 C 295 46 288 66 280 88 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 288 92 C 298 68 310 48 324 40 C 318 56 308 74 298 94 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 305 98 C 318 78 332 60 342 56 C 334 72 322 86 312 102 Z"
            fill="url(#sunGrad)"
          />
          <path
            d="M 318 104 C 334 88 348 76 356 74 C 346 88 334 98 324 108 Z"
            fill="url(#sunGrad)"
          />
        </g>

        {/* 2. Earth Globe (Sphere with Ocean, Grid lines & Golden illuminated continents) */}
        <g id="earth-globe">
          {/* Globe Atmosphere / Deep Shadow */}
          <circle cx="270" cy="225" r="115" fill="url(#globeOcean)" />

          <g clipPath="url(#globeClip)">
            {/* Latitude & Longitude Geodetic Grid */}
            <circle cx="270" cy="225" r="115" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.45" />
            <ellipse cx="270" cy="225" rx="75" ry="115" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.45" />
            <ellipse cx="270" cy="225" rx="36" ry="115" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.45" />
            <line x1="155" y1="225" x2="385" y2="225" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.45" />
            <ellipse cx="270" cy="225" rx="115" ry="75" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.35" />
            <ellipse cx="270" cy="225" rx="115" ry="36" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.35" />

            {/* Continents / Landmass silhouettes with Golden Sunlight Nightlight Effect */}
            {/* Americas / Western hemisphere land */}
            <path
              d="M 185 180 C 190 160 215 155 235 160 C 245 170 240 190 230 200 C 220 210 210 230 218 250 C 225 270 240 280 235 295 C 225 305 210 300 200 280 C 195 260 198 235 188 220 Z"
              fill="url(#goldContinents)"
              opacity="0.92"
            />
            {/* Eurasia / Africa East Illuminated hemisphere */}
            <path
              d="M 270 145 C 290 140 330 145 355 165 C 375 180 370 210 350 230 C 335 240 320 235 305 250 C 295 260 300 285 285 290 C 275 280 270 260 275 240 C 265 220 260 180 270 145 Z"
              fill="url(#goldContinents)"
              opacity="0.95"
            />
            {/* City lights golden glimmer overlay */}
            <circle cx="320" cy="180" r="1.5" fill="#FFF" opacity="0.9" />
            <circle cx="340" cy="195" r="1.5" fill="#FFF" opacity="0.9" />
            <circle cx="305" cy="170" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="225" cy="190" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="215" cy="240" r="1.5" fill="#FFF" opacity="0.8" />
          </g>

          {/* Globe Rim Highlight */}
          <circle cx="270" cy="225" r="115" fill="none" stroke="#E0F2FE" strokeWidth="2.5" opacity="0.6" />
        </g>

        {/* 3. Curved Spherical Photovoltaic Solar Grid (Lower Right) */}
        <g id="solar-pv-array">
          {/* Base curved panel shape */}
          <path
            d="M 285 342 C 345 330 380 270 386 215 C 400 265 395 335 340 388 C 300 410 270 395 285 342 Z"
            fill="url(#solarCell)"
            stroke="#BAE6FD"
            strokeWidth="2.5"
          />
          {/* Grid lines inside solar collector */}
          <path d="M 315 332 C 352 300 375 250 382 225" stroke="#E0F2FE" strokeWidth="1.8" fill="none" />
          <path d="M 338 355 C 368 318 385 272 388 245" stroke="#E0F2FE" strokeWidth="1.8" fill="none" />
          <path d="M 305 358 C 330 375 355 382 375 380" stroke="#E0F2FE" strokeWidth="1.8" fill="none" />
          <path d="M 325 330 C 350 348 375 352 392 340" stroke="#E0F2FE" strokeWidth="1.8" fill="none" />
          <path d="M 345 295 C 365 315 385 318 395 305" stroke="#E0F2FE" strokeWidth="1.8" fill="none" />
        </g>

        {/* 4. Green Eco Leaves (Bottom Left) */}
        <g id="green-leaves">
          {/* Upper large leaf */}
          <path
            d="M 270 348 C 210 355 130 300 115 210 C 145 220 175 255 190 290 C 200 308 228 335 270 348 Z"
            fill="url(#leafGrad)"
            stroke="#DCFCE7"
            strokeWidth="2"
          />
          {/* Central vein */}
          <path d="M 125 218 C 148 245 185 292 260 345" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Secondary side veins */}
          <path d="M 152 248 C 165 242 180 245 188 252" stroke="#86EFAC" strokeWidth="1.8" fill="none" />
          <path d="M 180 278 C 195 270 210 272 220 282" stroke="#86EFAC" strokeWidth="1.8" fill="none" />

          {/* Lower smaller sprout leaf */}
          <path
            d="M 198 340 C 160 345 135 370 120 380 C 145 382 170 378 185 365 C 192 358 196 350 198 340 Z"
            fill="url(#leafGrad)"
            stroke="#DCFCE7"
            strokeWidth="1.5"
          />
          <path d="M 130 378 C 150 370 170 360 192 345" stroke="#86EFAC" strokeWidth="1.8" fill="none" />
        </g>

        {/* 5. Signature 3D Red-Orange Glossy 'V' Heart Crest (Foreground Anchor) */}
        <g id="red-v-crest" filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.65))">
          {/* Left Wing Swoosh 1 */}
          <path
            d="M 172 90 C 220 85 260 125 290 195 C 265 180 220 140 160 118 Z"
            fill="url(#redVGrad)"
            stroke="#FFF"
            strokeWidth="1.5"
          />
          {/* Left Wing Swoosh 2 (Foreground Curve) */}
          <path
            d="M 160 112 C 225 105 272 165 290 255 C 275 220 240 170 175 148 Z"
            fill="url(#redVGrad)"
            stroke="#FFF"
            strokeWidth="1.5"
          />
          {/* Main Giant 'V' Heart Structure (Sweeping from top right arch down to central point and back up) */}
          <path
            d="M 315 90 C 345 80 395 95 408 145 C 418 190 395 260 345 325 C 300 375 275 352 270 350 C 268 348 245 285 210 205 C 195 170 215 155 240 178 C 265 205 285 270 288 320 C 325 265 372 205 368 152 C 362 120 335 110 315 90 Z"
            fill="url(#redVGrad)"
            stroke="#FFFFFF"
            strokeWidth="2.2"
          />
          {/* Highlight glare overlay on 'V' right sweep */}
          <path
            d="M 320 95 C 342 88 382 102 396 142 C 404 175 388 232 348 290 C 370 230 388 175 382 145 C 374 122 350 110 320 95 Z"
            fill="url(#vHighlight)"
          />
        </g>

        {/* 6. Exact Stylized Text: "Vaasu Genix Solar" with Multi-color Rainbow Gradient & Sun on 'G' */}
        <g id="brand-typography">
          <defs>
            {/* Rainbow-Orange-Green Texture Gradient for 'Vaasu Genix' */}
            <linearGradient id="textRainbow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="28%" stopColor="#22C55E" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            {/* Radiant Golden Glow for 'Solar' */}
            <linearGradient id="textGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Small Rising Sun above the 'G' of Genix */}
          <path
            d="M 230 435 C 230 422 248 422 248 435 Z"
            fill="#FFA000"
            stroke="#D50000"
            strokeWidth="1.2"
          />
          <path d="M 228 425 L 225 418" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 233 421 L 232 414" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 239 420 L 239 412" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 245 421 L 246 414" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 250 425 L 253 418" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />

          {/* "Vaasu Genix" Main Title */}
          <text
            x="20"
            y="475"
            fontFamily="'Cinzel', 'Trajan Pro', 'Georgia', serif"
            fontSize="46"
            fontWeight="900"
            letterSpacing="1.2"
            fill="url(#textRainbow)"
            stroke="#1E293B"
            strokeWidth="1.8"
            style={{ filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.85))" }}
          >
            Vaasu Genix
          </text>

          {/* "Solar" Title with sunburst icon inside the 'o' */}
          <text
            x="365"
            y="475"
            fontFamily="'Cinzel', 'Trajan Pro', 'Georgia', serif"
            fontSize="48"
            fontWeight="900"
            letterSpacing="1"
            fill="url(#textGold)"
            stroke="#1E293B"
            strokeWidth="1.8"
            style={{ filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.85))" }}
          >
            Solar
          </text>

          {/* Mini Sunrays bursting out of the letter 'o' in Solar */}
          <circle cx="403" cy="460" r="7.5" fill="#1E3A8A" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="403" y1="452" x2="403" y2="444" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="403" y1="468" x2="403" y2="476" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="395" y1="460" x2="387" y2="460" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="411" y1="460" x2="419" y2="460" stroke="#F59E0B" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Brand Text Block for Header & Hero */}
      {variant !== "footer" ? (
        <div className="leading-tight text-left">
          <div className="font-extrabold tracking-tight text-base sm:text-lg text-white drop-shadow">
            VASU GENIX <span className="text-[#22C55E]">SOLAR</span>
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#F97316] uppercase mt-0.5">
            {SITE_CONFIG.tagline}
          </div>
        </div>
      ) : (
        <div className="leading-tight text-left">
          <div className="font-extrabold tracking-tight text-base sm:text-lg text-white">
            VASU GENIX <span className="text-[#22C55E]">SOLAR</span>
          </div>
          <div className="text-[9px] font-bold tracking-widest text-[#F97316] uppercase mt-0.5">
            {SITE_CONFIG.tagline}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * 10. CINEMATIC 5-SLIDE AUTO-ROTATING HERO SLIDER (2-Second Interval with Videos)
 * ============================================================================
 */
const SolarHeroSlider = ({
  onNavigateToQuote,
  onNavigateToCalculator,
  onNavigateToContact
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState({});
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slideCount = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Set hero slide rotation interval to exactly 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <section
      aria-label="VASU GENIX SOLAR Featured Highlights Slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16 select-none"
    >
      {HERO_SLIDES.map((slide, index) => {
        const isCurrent = index === activeSlide;
        const showVideo = slide.mediaType === "video" && !videoFailed[slide.id];

        return (
          <div
            key={slide.id}
            aria-hidden={!isCurrent}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {showVideo ? (
              <video
                src={slide.videoUrl}
                poster={slide.fallbackImage}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoFailed((prev) => ({ ...prev, [slide.id]: true }))}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-[2000ms]"
              />
            ) : (
              <img
                src={slide.fallbackImage}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className={`w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out ${
                  isCurrent ? "scale-105" : "scale-100"
                }`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#042f4b]/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
          </div>
        );
      })}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <BrandLogo variant="hero" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold tracking-wider uppercase text-orange-400">
                <Sun className="w-4 h-4 text-orange-400" />
                <span>{SITE_CONFIG.tagline}</span>
              </div>
            </div>

            <div>
              <span className="inline-block px-3.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-widest">
                Slide 0{activeSlide + 1} / 0{slideCount} • {currentSlide.badge}
              </span>
            </div>

            <h1
              key={`h-${currentSlide.id}`}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white transition-all duration-500"
            >
              {currentSlide.heading}
            </h1>

            <p
              key={`p-${currentSlide.id}`}
              className="text-base sm:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal"
            >
              {currentSlide.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onNavigateToQuote}
                className="px-7 py-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/30 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get a Solar Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onNavigateToCalculator}
                className="px-7 py-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/25 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Your Solar EMI</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-200">
              <a
                href={SITE_CONFIG.telHref}
                className="inline-flex items-center gap-2 font-bold text-white hover:text-orange-400 transition"
              >
                <Phone className="w-4 h-4 text-green-400" />
                <span>Call: {SITE_CONFIG.contactDetails.phoneDisplay}</span>
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Tenali, Andhra Pradesh</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-sky-400/30 p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400 block">
                    VASU GENIX PACKAGES
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    Systems Starting From 3 kW
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-xs font-bold">
                  Easy EMI
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10, 20, 50, 100].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => onNavigateToCalculator(kw)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-sky-500/30 border border-white/10 hover:border-sky-400 text-center transition cursor-pointer"
                  >
                    <span className="text-sm font-extrabold text-white block">{kw} kW</span>
                    <span className="text-[10px] text-sky-300">Check EMI →</span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Select any solar system size from <strong>3 kW to 100 kW</strong> to calculate your monthly reducing-balance EMI, solar unit generation, and estimated electricity bill savings.
              </p>

              <a
                href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
                  SITE_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp ({SITE_CONFIG.phoneRaw})
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Slide Dots">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Go to slide ${idx + 1}: ${s.heading}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx
                    ? "w-10 bg-[#F97316]"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume slider autoplay" : "Pause slider autoplay"}
              className="px-3.5 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-orange-400" /> : <Pause className="w-3.5 h-3.5 text-green-400" />}
              <span>{isPaused ? "Paused" : "Auto-Rotating"}</span>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * 11. SOLAR SYSTEM PACKAGES SECTION (STARTING AT 3 KW)
 * ============================================================================
 */
const SolarSystemCards = ({
  selectedKw,
  pricingConfig,
  generationAssumptions,
  defaultInterestRate,
  defaultTenureMonths,
  onSelectSystemKw,
  onRequestPackageQuote
}) => {
  return (
    <section id="solar-packages-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-[#0369A1] text-xs font-bold uppercase tracking-wider">
            <Sun className="w-4 h-4 text-[#F97316]" /> VASU GENIX System Options (3 kW – 100 kW)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Choose the Right Solar System for Your Needs
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Explore our solar system capacities starting from <strong>3 kW</strong>. Click any system card below to load it directly into the interactive <strong>Solar EMI & Savings Calculator</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGE_CARDS_CONFIG.map((pkg) => {
            const categoryKey = pkg.kw <= 10 ? "residential" : pkg.kw <= 20 ? "commercial" : "industrial";
            const calc = calculateSolarFinancials({
              capacityKw: pkg.kw,
              categoryKey,
              pricingConfig,
              manualCostOverride: "",
              downPaymentInr: 0,
              annualInterestRatePct: defaultInterestRate,
              tenureMonths: defaultTenureMonths,
              monthlyBillInr: 0,
              tariffInr: generationAssumptions.defaultTariffInr,
              dailyGenPerKw: generationAssumptions.dailyGenPerKw,
              systemLossesPct: generationAssumptions.systemLossesPct,
              selfConsumptionPct: generationAssumptions.selfConsumptionPct
            });

            const isSelected = Number(selectedKw) === pkg.kw;

            return (
              <div
                key={pkg.kw}
                onClick={() => onSelectSystemKw(pkg.kw)}
                className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? "bg-white border-[#0284C7] shadow-xl ring-4 ring-sky-500/10"
                    : "bg-white border-slate-200 hover:border-[#16A34A] hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-green-50 text-[#16A34A] border border-green-200 text-xs font-bold">
                      {pkg.tier}
                    </span>
                    {isSelected && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0284C7] text-white text-[11px] font-bold">
                        Active in Calculator
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-extrabold text-slate-900">{pkg.title}</h3>
                    <span className="text-sm font-bold text-[#F97316]">{pkg.kw} kW</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {pkg.suitability}
                  </p>

                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Est. Usable Generation:</span>
                      <span className="font-bold text-slate-900">
                        ~{calc.monthlyUsableGenerationKwh.toLocaleString("en-IN")} kWh / mo
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                      <span className="text-slate-500 font-medium">Indicative System Price:</span>
                      {calc.isPriceConfigured ? (
                        <span className="font-bold text-[#0369A1]">
                          {formatINR(calc.estimatedSystemCost)}
                        </span>
                      ) : (
                        <span className="font-semibold text-amber-700">
                          Request Official Quote
                        </span>
                      )}
                    </div>

                    {calc.isPriceConfigured && calc.monthlyEmi > 0 && (
                      <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                        <span className="text-slate-500 font-medium">
                          Indicative EMI ({defaultTenureMonths}m):
                        </span>
                        <span className="font-bold text-[#16A34A]">
                          {formatINR(calc.monthlyEmi)} / mo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSystemKw(pkg.kw);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Calculate EMI
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestPackageQuote(pkg.kw, calc);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-[#0369A1]/10 via-green-50 to-orange-50 border border-sky-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>Important Engineering Note for Homeowners, Industries & Rice Mills:</span>
          </div>
          <p className="leading-relaxed">
            The system tiers shown above (<strong>3–5 kW</strong> for smaller residential rooftops, <strong>10–20 kW</strong> for larger homes and smaller commercial buildings, and <strong>30–100 kW</strong> for larger commercial and industrial facilities) are indicative categories, not guaranteed suitability recommendations. For <strong>rice mills and industrial users</strong>, the appropriate solar capacity depends on your actual monthly electricity consumption, connected load (HP/kVA), available shadow-free rooftop or land area, and daytime operating shift hours.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * 12. INTEGRATED SOLAR EMI & SAVINGS CALCULATOR (STARTING FROM 3 KW)
 * ============================================================================
 */
const SolarEMICalculator = ({
  selectedKw,
  onSelectKw,
  pricingConfig,
  onUpdatePricingConfig,
  generationAssumptions,
  onUpdateGenerationAssumptions,
  onGetSolarQuotation
}) => {
  const [categoryKey, setCategoryKey] = useState("residential");
  const [locationInput, setLocationInput] = useState("Tenali, Andhra Pradesh");
  const [manualCostOverride, setManualCostOverride] = useState("");
  const [downPaymentInr, setDownPaymentInr] = useState(30000);
  const [annualInterestRatePct, setAnnualInterestRatePct] = useState(9.5);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [monthlyBillInr, setMonthlyBillInr] = useState(4500);
  const [tariffInr, setTariffInr] = useState(generationAssumptions.defaultTariffInr);
  const [showAdminPricingPanel, setShowAdminPricingPanel] = useState(false);

  const categoryLabels = {
    residential: "Residential",
    commercial: "Commercial",
    industrial: "Industrial",
    riceMill: "Rice Mill",
    agricultural: "Agricultural"
  };

  const calc = useMemo(() => {
    return calculateSolarFinancials({
      capacityKw: selectedKw,
      categoryKey,
      pricingConfig,
      manualCostOverride,
      downPaymentInr,
      annualInterestRatePct,
      tenureMonths,
      monthlyBillInr,
      tariffInr,
      dailyGenPerKw: generationAssumptions.dailyGenPerKw,
      systemLossesPct: generationAssumptions.systemLossesPct,
      selfConsumptionPct: generationAssumptions.selfConsumptionPct
    });
  }, [
    selectedKw,
    categoryKey,
    pricingConfig,
    manualCostOverride,
    downPaymentInr,
    annualInterestRatePct,
    tenureMonths,
    monthlyBillInr,
    tariffInr,
    generationAssumptions
  ]);

  const handleApplyIndicativeRateForTesting = () => {
    const sampleRates = {
      residential: 58000,
      commercial: 52000,
      industrial: 47000,
      riceMill: 48000,
      agricultural: 50000
    };
    const rate = sampleRates[categoryKey] || 55000;
    onUpdatePricingConfig(categoryKey, rate);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-[#042f4b] via-[#0369A1] to-[#15803D] text-white p-6 sm:p-8 lg:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-orange-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Interactive Solar EMI & Savings Calculator
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            VASU GENIX SOLAR System Pricing, EMI & Generation Calculator
          </h3>
          <p className="text-sky-100 text-xs sm:text-sm max-w-2xl">
            Starting from <strong>3 kW</strong>. Calculate your reducing-balance monthly loan EMI, solar electricity generation, and indicative monthly savings in Indian Rupees (₹).
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-950/40 p-1.5 rounded-2xl border border-white/15">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategoryKey(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryKey === key
                  ? "bg-[#F97316] text-white shadow"
                  : "text-sky-100 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-7 border-b lg:border-b-0 lg:border-r border-slate-200">
          {calc.validationError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Input Validation Notice:</strong>
                <span>{calc.validationError}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="emi-capacity-input" className="text-sm font-extrabold text-slate-900">
                1. Select Solar System Capacity (Starting from 3 kW)
              </label>
              <span className="text-xs font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                Selected: {selectedKw} kW
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {SYSTEM_SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSelectKw(size)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    Number(selectedKw) === size
                      ? "bg-[#0284C7] text-white border-[#0284C7] shadow-md"
                      : "bg-slate-50 text-slate-800 border-slate-200 hover:border-[#0284C7]"
                  }`}
                >
                  {size} kW
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="emi-capacity-input" className="block text-xs font-bold text-slate-600 mb-1">
                  Manual System Capacity (kW)
                </label>
                <div className="relative">
                  <input
                    id="emi-capacity-input"
                    type="number"
                    min="1"
                    max="5000"
                    step="0.5"
                    value={selectedKw}
                    onChange={(e) => onSelectKw(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0284C7] outline-none font-bold text-slate-900 text-sm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    kW
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="emi-location-input" className="block text-xs font-bold text-slate-600 mb-1">
                  Your City / Location
                </label>
                <input
                  id="emi-location-input"
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g., Tenali, Guntur, Vijayawada"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0284C7] outline-none font-semibold text-slate-900 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  2. Solar System Cost Configuration ({categoryLabels[categoryKey]})
                </h4>
                <p className="text-xs text-slate-500">
                  Estimated System Cost = System Capacity × Configured Price Per kW (or enter a manual total cost below).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminPricingPanel(!showAdminPricingPanel)}
                className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showAdminPricingPanel ? "Hide Rate Config" : "Configure Rate / kW"}
              </button>
            </div>

            {!calc.isPriceConfigured && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <strong className="block">Official VASU GENIX Price Not Yet Entered:</strong>
                  <span>
                    To avoid displaying a misleading ₹0 quotation, please enter your estimated system cost or configure a rate per kW below to calculate EMI, or request an official VASU GENIX SOLAR quote.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleApplyIndicativeRateForTesting}
                  className="shrink-0 px-3.5 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs cursor-pointer"
                >
                  Load Sample Rate for EMI Test
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emi-rate-kw" className="block text-xs font-bold text-slate-700 mb-1">
                  Configured Price per kW for {categoryLabels[categoryKey]} (₹/kW)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    id="emi-rate-kw"
                    type="number"
                    min="0"
                    step="1000"
                    value={pricingConfig[categoryKey]?.pricePerKw || ""}
                    placeholder="0 (Enter rate per kW)"
                    onChange={(e) => onUpdatePricingConfig(categoryKey, Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="emi-manual-cost" className="block text-xs font-bold text-slate-700 mb-1">
                  Total Estimated System Cost Override (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    id="emi-manual-cost"
                    type="number"
                    min="0"
                    step="5000"
                    value={manualCostOverride}
                    placeholder={
                      calc.isPriceConfigured ? String(calc.estimatedSystemCost) : "Enter total cost in ₹"
                    }
                    onChange={(e) => setManualCostOverride(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>
            </div>

            {showAdminPricingPanel && (
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div key={key}>
                    <label className="block font-semibold text-slate-600 mb-1 truncate">{label} ₹/kW</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={pricingConfig[key]?.pricePerKw || 0}
                      onChange={(e) => onUpdatePricingConfig(key, Math.max(0, Number(e.target.value)))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900">
              3. Loan & EMI Financing Parameters
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emi-downpayment" className="block text-xs font-bold text-slate-700 mb-1">
                  Initial Down Payment (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    id="emi-downpayment"
                    type="number"
                    min="0"
                    step="5000"
                    value={downPaymentInr}
                    onChange={(e) => setDownPaymentInr(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="emi-loan-amount" className="block text-xs font-bold text-slate-700 mb-1">
                  Financing / Principal Loan Amount (P)
                </label>
                <input
                  id="emi-loan-amount"
                  type="text"
                  readOnly
                  value={calc.isPriceConfigured ? formatINR(calc.loanAmount) : "Configure System Cost First"}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 font-extrabold text-[#0369A1] text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="emi-interest" className="text-xs font-bold text-slate-700">
                    Annual Interest Rate (%)
                  </label>
                  <span className="text-[11px] text-slate-500">Supports 0% Zero-Interest</span>
                </div>
                <div className="relative">
                  <input
                    id="emi-interest"
                    type="number"
                    min="0"
                    max="36"
                    step="0.25"
                    value={annualInterestRatePct}
                    onChange={(e) => setAnnualInterestRatePct(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    % p.a.
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="emi-tenure" className="text-xs font-bold text-slate-700">
                    Loan Tenure (in Months)
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {(Math.max(0, Number(tenureMonths)) / 12).toFixed(1)} Years
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="emi-tenure"
                    type="number"
                    min="1"
                    max="240"
                    step="6"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Months
                  </span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {[12, 24, 36, 60, 84, 120].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`px-2 py-1 rounded text-[11px] font-bold border transition cursor-pointer ${
                        Number(tenureMonths) === m
                          ? "bg-[#0284C7] text-white border-[#0284C7]"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-200">
            <h4 className="text-sm font-extrabold text-slate-900">
              4. Electricity Bill, Tariff & Configurable Generation Assumptions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="emi-bill" className="block text-xs font-bold text-slate-700 mb-1">
                  Est. Monthly Electricity Bill (₹)
                </label>
                <input
                  id="emi-bill"
                  type="number"
                  min="0"
                  step="500"
                  value={monthlyBillInr}
                  onChange={(e) => setMonthlyBillInr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label htmlFor="emi-tariff" className="block text-xs font-bold text-slate-700 mb-1">
                  Electricity Tariff (₹ / Unit)
                </label>
                <input
                  id="emi-tariff"
                  type="number"
                  min="1"
                  max="30"
                  step="0.25"
                  value={tariffInr}
                  onChange={(e) => setTariffInr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label htmlFor="emi-daily-gen" className="block text-xs font-bold text-slate-700 mb-1">
                  Daily Gen per kW (kWh/day)
                </label>
                <input
                  id="emi-daily-gen"
                  type="number"
                  min="2"
                  max="6"
                  step="0.1"
                  value={generationAssumptions.dailyGenPerKw}
                  onChange={(e) =>
                    onUpdateGenerationAssumptions({
                      ...generationAssumptions,
                      dailyGenPerKw: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label htmlFor="emi-losses" className="block text-xs font-bold text-slate-700 mb-1">
                  System Losses (%)
                </label>
                <input
                  id="emi-losses"
                  type="number"
                  min="0"
                  max="40"
                  step="1"
                  value={generationAssumptions.systemLossesPct}
                  onChange={(e) =>
                    onUpdateGenerationAssumptions({
                      ...generationAssumptions,
                      systemLossesPct: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="emi-self-cons" className="block text-xs font-bold text-slate-700 mb-1">
                  Self-Consumption Ratio (%) — Daytime Direct Usage
                </label>
                <input
                  id="emi-self-cons"
                  type="number"
                  min="10"
                  max="100"
                  step="5"
                  value={generationAssumptions.selfConsumptionPct}
                  onChange={(e) =>
                    onUpdateGenerationAssumptions({
                      ...generationAssumptions,
                      selfConsumptionPct: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-b from-[#042f4b] via-[#06395a] to-slate-950 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block">
                  Indicative Financial & Yield Summary
                </span>
                <h4 className="text-xl font-extrabold text-white mt-0.5">
                  {calc.capacityKw} kW {categoryLabels[categoryKey]} System
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold">
                {locationInput || "India"}
              </span>
            </div>

            {calc.isPriceConfigured ? (
              <div className="p-5 rounded-2xl bg-white/10 border border-sky-400/30 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-sky-200 font-bold block">
                      Indicative Monthly EMI
                    </span>
                    <span className="text-[11px] text-slate-300">
                      For {tenureMonths} months @ {annualInterestRatePct}% p.a.
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F97316] tabular-nums">
                    {formatINR(calc.monthlyEmi)}
                    <span className="text-xs font-semibold text-orange-200">/mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-300 block">Estimated System Cost</span>
                    <strong className="text-sm text-white tabular-nums">
                      {formatINR(calc.estimatedSystemCost)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-300 block">Initial Down Payment</span>
                    <strong className="text-sm text-white tabular-nums">
                      {formatINR(calc.downPaymentInr)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-300 block">Principal Loan Amount (P)</span>
                    <strong className="text-sm text-sky-300 tabular-nums">
                      {formatINR(calc.loanAmount)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-300 block">Total Interest Payable</span>
                    <strong className="text-sm text-amber-300 tabular-nums">
                      {formatINR(calc.totalInterestPayable)}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Total Loan Repayment (Principal + Interest)</span>
                  <strong className="text-sm font-extrabold text-white tabular-nums">
                    {formatINR(calc.totalRepayment)}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-100 space-y-3">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="text-white block text-sm mb-1">
                      Request Official VASU GENIX SOLAR Quotation for Price & EMI
                    </strong>
                    System pricing for {categoryLabels[categoryKey]} ({calc.capacityKw} kW) is not pre-filled with a generic price. Enter a rate per kW on the left to simulate EMI, or click <strong>&ldquo;Get My Solar Quotation&rdquo;</strong> below to receive an accurate quote from VASU GENIX SOLAR.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleApplyIndicativeRateForTesting}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition cursor-pointer"
                >
                  Load Indicative Sample Rate to Preview EMI Math
                </button>
              </div>
            )}

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-300 block">
                Solar Generation & Bill Savings Estimate
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-sky-200 block">Monthly Usable Generation</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 tabular-nums">
                    {calc.monthlyUsableGenerationKwh.toLocaleString("en-IN")}{" "}
                    <span className="text-xs font-semibold text-green-300">kWh</span>
                  </div>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    Gross: {calc.monthlyGrossGenerationKwh.toLocaleString("en-IN")} kWh ({calc.dailyGrossGenerationKwh} kWh/day)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-sky-200 block">Indicative Monthly Savings</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#4ADE80] mt-1 tabular-nums">
                    {formatINR(calc.estimatedMonthlySavingsInr)}
                  </div>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    @ ₹{tariffInr}/kWh & {generationAssumptions.selfConsumptionPct}% self-use
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-green-950/50 border border-green-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-green-100">Estimated Annual Electricity Savings:</span>
                  <strong className="text-base font-extrabold text-white tabular-nums">
                    {formatINR(calc.estimatedAnnualSavingsInr)} / yr
                  </strong>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-green-100">Indicative Simple Payback Period:</span>
                  <strong className="text-sm font-bold text-orange-300">
                    {calc.indicativePaybackYears
                      ? `~${calc.indicativePaybackYears} Years`
                      : "Requires Configured System Cost"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 space-y-4">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>Preliminary Estimate Disclaimer:</strong> All EMI, pricing, generation, and savings figures are indicative calculations based on your inputs ({generationAssumptions.dailyGenPerKw} kWh/kW/day, {generationAssumptions.systemLossesPct}% losses, {generationAssumptions.selfConsumptionPct}% self-consumption). Actual savings depend on roof shading, export tariff rules, fixed/demand charges, and an official VASU GENIX SOLAR site inspection.
            </p>

            <button
              type="button"
              onClick={() =>
                onGetSolarQuotation({
                  company: SITE_CONFIG.companyName,
                  selectedSystemKw: calc.capacityKw,
                  category: categoryLabels[categoryKey],
                  estimatedSystemCost: calc.isPriceConfigured
                    ? formatINR(calc.estimatedSystemCost)
                    : "Official Quote Requested",
                  downPayment: calc.isPriceConfigured ? formatINR(calc.downPaymentInr) : "To Be Discussed",
                  loanAmount: calc.isPriceConfigured ? formatINR(calc.loanAmount) : "To Be Discussed",
                  indicativeMonthlyEmi: calc.isPriceConfigured
                    ? `${formatINR(calc.monthlyEmi)} / month (${tenureMonths} months @ ${annualInterestRatePct}%)`
                    : "EMI Quote Requested",
                  monthlyGenerationKwh: `${calc.monthlyUsableGenerationKwh} kWh/month`,
                  indicativeMonthlySavings: `${formatINR(calc.estimatedMonthlySavingsInr)}/month`,
                  monthlyBill: monthlyBillInr,
                  location: locationInput || "Tenali, Andhra Pradesh"
                })
              }
              className="w-full py-4 px-6 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get My Solar Quotation ({calc.capacityKw} kW)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * 13. CONTACT & QUOTATION SECTION
 * ============================================================================
 */
const ContactSection = ({ prefilledSummary = null }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: prefilledSummary?.location || "Tenali, Andhra Pradesh",
    category: prefilledSummary?.category || "Residential",
    monthlyBill: prefilledSummary?.monthlyBill ? String(prefilledSummary.monthlyBill) : "",
    solution: prefilledSummary?.selectedSystemKw
      ? `${prefilledSummary.selectedSystemKw} kW Solar System`
      : "3 kW – 10 kW Residential Rooftop Solar",
    requirements: "",
    honeypot: ""
  });

  useEffect(() => {
    if (prefilledSummary) {
      const summaryText = [
        `Company: ${SITE_CONFIG.companyName}`,
        `Selected System: ${prefilledSummary.selectedSystemKw} kW (${prefilledSummary.category})`,
        `Estimated System Cost: ${prefilledSummary.estimatedSystemCost}`,
        `Down Payment: ${prefilledSummary.downPayment}`,
        `Indicative Monthly EMI: ${prefilledSummary.indicativeMonthlyEmi}`,
        `Indicative Monthly Generation: ${prefilledSummary.monthlyGenerationKwh}`,
        `Location: ${prefilledSummary.location}`
      ].join("\n");

      setFormData((prev) => ({
        ...prev,
        city: prefilledSummary.location || prev.city,
        category: prefilledSummary.category || prev.category,
        monthlyBill: prefilledSummary.monthlyBill ? String(prefilledSummary.monthlyBill) : prev.monthlyBill,
        solution: `${prefilledSummary.selectedSystemKw} kW Solar System`,
        requirements: summaryText
      }));
    }
  }, [prefilledSummary]);

  const [errors, setErrors] = useState({});
  const [submissionState, setSubmissionState] = useState("idle");
  const [submittedPayload, setSubmittedPayload] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }
    const cleanPhone = formData.mobile.replace(/[\s\-()]/g, "");
    const indianMobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!indianMobileRegex.test(cleanPhone)) {
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city or village.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, intentLabel = "Solar Quotation Request") => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validateForm()) return;

    setSubmissionState("submitting");
    const payload = {
      company: SITE_CONFIG.companyName,
      intentLabel,
      ...formData,
      submittedAt: new Date().toISOString()
    };

    if (SITE_CONFIG.contactBackend.endpointUrl && SITE_CONFIG.contactBackend.mode === "production") {
      try {
        const res = await fetch(SITE_CONFIG.contactBackend.endpointUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Network response was not ok");
        setSubmittedPayload(payload);
        setSubmissionState("sent_live");
      } catch (err) {
        setSubmissionState("error");
      }
    } else {
      await new Promise((r) => setTimeout(r, 400));
      setSubmittedPayload(payload);
      setSubmissionState("dev_logged");
    }
  };

  const buildWhatsAppSummaryHref = () => {
    const baseText = SITE_CONFIG.whatsapp.defaultMessage;
    const details = [
      baseText,
      "",
      `--- MY SOLAR ENQUIRY SUMMARY ---`,
      `Name: ${formData.fullName || "[Not Entered]"}`,
      `Mobile: ${formData.mobile || "[Not Entered]"}`,
      `Location: ${formData.city || "Tenali, AP"}`,
      `Category: ${formData.category}`,
      `Selected System: ${formData.solution}`,
      formData.requirements ? `\nCalculation Summary:\n${formData.requirements}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    return `${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(details)}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full">
            VASU GENIX SOLAR Consultation & EMI Desk
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Let&apos;s Build Your Solar Project
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Get an official site inspection, system quotation, and EMI financing breakdown from our team at Gandhi Chowk, Tenali.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <a
            href={SITE_CONFIG.telHref}
            className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0369A1] font-bold text-xs flex items-center gap-2 border border-sky-200 transition"
          >
            <Phone className="w-4 h-4 text-[#0284C7]" />
            <span>Call: {SITE_CONFIG.contactDetails.phoneDisplay}</span>
          </a>
          <a
            href={buildWhatsAppSummaryHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-[#15803D] font-bold text-xs flex items-center gap-2 border border-green-200 transition"
          >
            <MessageCircle className="w-4 h-4 text-[#16A34A]" />
            <span>WhatsApp: {SITE_CONFIG.contactDetails.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      {prefilledSummary && (
        <div className="mb-6 p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0369A1] uppercase tracking-wider text-xs">
              Attached Calculator Quotation Summary
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#16A34A] text-white text-[11px] font-bold">
              {prefilledSummary.selectedSystemKw} kW Selected
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div>
              <span className="text-slate-500 block">Company:</span>
              <strong>{prefilledSummary.company}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Estimated System Cost:</span>
              <strong>{prefilledSummary.estimatedSystemCost}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Indicative Monthly EMI:</span>
              <strong className="text-[#16A34A]">{prefilledSummary.indicativeMonthlyEmi}</strong>
            </div>
          </div>
        </div>
      )}

      {submissionState === "sent_live" && (
        <div className="p-6 rounded-2xl bg-green-50 border border-green-300 text-green-950 space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
            <h4 className="font-bold text-lg">Quotation Request Submitted Successfully</h4>
          </div>
          <p className="text-sm">
            Thank you, <strong>{submittedPayload?.fullName}</strong>. Your enquiry for{" "}
            <strong>{submittedPayload?.solution}</strong> has been transmitted to VASU GENIX SOLAR.
          </p>
        </div>
      )}

      {submissionState === "dev_logged" && (
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-slate-900 space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-amber-200 text-amber-950 text-[11px] font-bold uppercase tracking-wider mb-1">
                Enquiry Validated Ready for Dispatch
              </span>
              <h4 className="font-bold text-base sm:text-lg text-slate-900">
                Send Directly to VASU GENIX SOLAR via WhatsApp (+91 9966448266) or Configure API Endpoint
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Because a live backend API URL is not yet configured, click the green button below to send your complete pre-filled summary straight to <strong>VASU GENIX SOLAR&apos;s official WhatsApp (9966448266)</strong> right now:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppSummaryHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Send This Summary on WhatsApp (+91 9966448266)
            </a>
            <a
              href={SITE_CONFIG.telHref}
              className="px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call 9966448266 Now
            </a>
          </div>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, "Request a Consultation")} noValidate className="space-y-5">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="c-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="c-name"
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.fullName ? "border-red-500 bg-red-50/30" : "border-slate-300"
              } focus:border-[#0284C7] outline-none text-sm`}
            />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="c-mobile" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mobile Number (10-Digit India) <span className="text-red-500">*</span>
            </label>
            <input
              id="c-mobile"
              type="tel"
              required
              placeholder="e.g., 9966448266"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.mobile ? "border-red-500 bg-red-50/30" : "border-slate-300"
              } focus:border-[#0284C7] outline-none text-sm`}
            />
            {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label htmlFor="c-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              id="c-email"
              type="email"
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0284C7] outline-none text-sm"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="c-city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              City / Town / Village <span className="text-red-500">*</span>
            </label>
            <input
              id="c-city"
              type="text"
              required
              placeholder="e.g., Tenali, Guntur, Bapatla"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.city ? "border-red-500 bg-red-50/30" : "border-slate-300"
              } focus:border-[#0284C7] outline-none text-sm`}
            />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="c-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Customer Category
            </label>
            <select
              id="c-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-[#0284C7] outline-none text-sm"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Rice Mill">Rice Mill</option>
              <option value="Agricultural">Agricultural</option>
            </select>
          </div>

          <div>
            <label htmlFor="c-bill" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Avg. Monthly Electricity Bill (₹)
            </label>
            <input
              id="c-bill"
              type="text"
              placeholder="e.g., ₹4,500 or ₹2,50,000"
              value={formData.monthlyBill}
              onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0284C7] outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="c-solution" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Selected Solar System / Solution
          </label>
          <input
            id="c-solution"
            type="text"
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:border-[#0284C7] outline-none text-sm"
          />
        </div>

        <div>
          <label htmlFor="c-req" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Quotation Summary & Additional Requirements
          </label>
          <textarea
            id="c-req"
            rows={5}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            placeholder="Your selected system size, EMI summary, or specific site details..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xs focus:border-[#0284C7] outline-none"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
          <button
            type="submit"
            className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            <span>Submit Enquiry Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={buildWhatsAppSummaryHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[220px] py-3.5 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Quotation Request on WhatsApp</span>
          </a>

          <a
            href={SITE_CONFIG.telHref}
            className="py-3.5 px-5 rounded-xl border-2 border-[#F97316] text-[#EA580C] hover:bg-orange-50 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <Phone className="w-4 h-4" />
            <span>Call 9966448266</span>
          </a>
        </div>
      </form>
    </div>
  );
};

/**
 * ============================================================================
 * 14. MAIN APPLICATION COMPONENT (VASU GENIX SOLAR)
 * ============================================================================
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [selectedSystemKw, setSelectedSystemKw] = useState(3);
  const [pricingConfig, setPricingConfig] = useState(DEFAULT_SOLAR_PRICING);
  const [generationAssumptions, setGenerationAssumptions] = useState(
    DEFAULT_GENERATION_ASSUMPTIONS
  );
  const [quotationSummary, setQuotationSummary] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = `${SITE_CONFIG.companyName} | ${SITE_CONFIG.tagline} — Tenali, Andhra Pradesh`;
  }, [currentPage]);

  const navigateTo = (pageId, sectionAnchor = null) => {
    setCurrentPage(pageId);
    setSelectedBlog(null);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);

    if (sectionAnchor) {
      setTimeout(() => {
        const el = document.getElementById(sectionAnchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleUpdatePricingConfig = (categoryKey, newRatePerKw) => {
    setPricingConfig((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        pricePerKw: newRatePerKw
      }
    }));
  };

  const handleSelectSystemFromCard = (kw) => {
    setSelectedSystemKw(kw);
    if (currentPage !== "home") {
      setCurrentPage("home");
    }
    setTimeout(() => {
      const el = document.getElementById("emi-calculator-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const handleGetSolarQuotation = (summaryObj) => {
    setQuotationSummary(summaryObj);
    if (currentPage !== "home" && currentPage !== "contact") {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById("contact-enquiry-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigateTo("contact");
      }
    }
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const renderAddressAndMapBlock = () => (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-green-50 px-3 py-1 rounded-full">
          Verified Business Location
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
          {SITE_CONFIG.companyName}
        </h3>
        <p className="text-xs font-bold text-[#F97316] tracking-wider uppercase">
          {SITE_CONFIG.tagline}
        </p>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">Phone Number</span>
            <a
              href={SITE_CONFIG.telHref}
              className="text-base font-extrabold text-slate-900 hover:text-[#0284C7] transition"
            >
              {SITE_CONFIG.contactDetails.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-[#16A34A] flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">WhatsApp Desk</span>
            <a
              href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
                SITE_CONFIG.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-extrabold text-[#16A34A] hover:underline"
            >
              {SITE_CONFIG.contactDetails.whatsappDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">Office Address</span>
            <p className="font-bold text-slate-900 leading-snug">
              {SITE_CONFIG.contactDetails.address}
            </p>
            <a
              href={SITE_CONFIG.contactDetails.googleMapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:underline mt-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open Directions in Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 h-56 bg-slate-100">
        <iframe
          title="VASU GENIX SOLAR Gandhi Chowk Tenali Map"
          src={SITE_CONFIG.contactDetails.googleMapsEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );

  const renderHomePage = () => (
    <>
      <SolarHeroSlider
        onNavigateToQuote={() => navigateTo("home", "contact-enquiry-section")}
        onNavigateToCalculator={(kw) => {
          if (typeof kw === "number") setSelectedSystemKw(kw);
          navigateTo("home", "emi-calculator-section");
        }}
        onNavigateToContact={() => navigateTo("contact")}
      />

      <SolarSystemCards
        selectedKw={selectedSystemKw}
        pricingConfig={pricingConfig}
        generationAssumptions={generationAssumptions}
        defaultInterestRate={9.5}
        defaultTenureMonths={60}
        onSelectSystemKw={handleSelectSystemFromCard}
        onRequestPackageQuote={(kw, calc) =>
          handleGetSolarQuotation({
            company: SITE_CONFIG.companyName,
            selectedSystemKw: kw,
            category: kw <= 10 ? "Residential" : kw <= 20 ? "Commercial" : "Industrial",
            estimatedSystemCost: calc.isPriceConfigured
              ? formatINR(calc.estimatedSystemCost)
              : "Official Quote Requested",
            downPayment: "To Be Discussed",
            loanAmount: "To Be Discussed",
            indicativeMonthlyEmi: calc.isPriceConfigured
              ? `${formatINR(calc.monthlyEmi)} / mo`
              : "EMI Quote Requested",
            monthlyGenerationKwh: `${calc.monthlyUsableGenerationKwh} kWh/mo`,
            indicativeMonthlySavings: `${formatINR(calc.estimatedMonthlySavingsInr)}/mo`,
            monthlyBill: "",
            location: "Tenali, Andhra Pradesh"
          })
        }
      />

      <section id="emi-calculator-section" className="py-20 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SolarEMICalculator
            selectedKw={selectedSystemKw}
            onSelectKw={setSelectedSystemKw}
            pricingConfig={pricingConfig}
            onUpdatePricingConfig={handleUpdatePricingConfig}
            generationAssumptions={generationAssumptions}
            onUpdateGenerationAssumptions={setGenerationAssumptions}
            onGetSolarQuotation={handleGetSolarQuotation}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0284C7] text-xs font-bold uppercase tracking-wider border border-sky-200">
                About {SITE_CONFIG.companyName}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Delivering Clean Energy & a Green Future From Tenali Across Andhra Pradesh
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Headquartered at <strong>Gandhi Chowk, Tenali, Andhra Pradesh</strong>, <strong>VASU GENIX SOLAR</strong> specializes in engineering, supplying, and commissioning high-yield rooftop and ground-mounted solar power systems for homes, commercial buildings, agricultural farms, and modern rice mills.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#0284C7]" /> Complete 3 kW – 100 kW+ Range
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    From 3 kW domestic rooftop systems to megawatt-scale industrial and rice mill power plants.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" /> Transparent Engineering
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Honest load assessment, cyclone-resistant structures, and clear EMI financing guidance.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo("about")}
                  className="px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  Learn More About VASU GENIX SOLAR
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={SITE_CONFIG.telHref}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 hover:border-[#0284C7] text-slate-800 font-bold text-sm flex items-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  {SITE_CONFIG.contactDetails.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80"
                alt="VASU GENIX SOLAR rooftop installation"
                className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80"
                alt="VASU GENIX SOLAR industrial and rice mill installation"
                className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-lg mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-green-100 px-3.5 py-1.5 rounded-full">
                Our Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                VASU GENIX SOLAR Solutions
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo("solutions")}
              className="text-sm font-bold text-[#0284C7] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              View All 6 Solar Verticals <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((sol) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={sol.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-900">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-white text-xs font-bold">
                        {sol.category}
                      </span>
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center shadow">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900">{sol.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {sol.shortDesc}
                      </p>
                      <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                        {sol.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          [
                            "residential-solar",
                            "commercial-solar",
                            "industrial-solar",
                            "rice-mill-solar"
                          ].includes(sol.id)
                        ) {
                          navigateTo(sol.id);
                        } else {
                          navigateTo("solutions");
                        }
                      }}
                      className="w-full py-3 rounded-xl bg-slate-100 group-hover:bg-[#0284C7] text-slate-900 group-hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <span>Explore {sol.category} Solar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#042f4b] via-slate-900 to-[#063e28] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
                <Sprout className="w-4 h-4" /> Andhra Pradesh Rice Mill Solar Specialist
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Custom Solar Power Plants for Modern Rice Mills
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Operating in Tenali, Guntur, Bapatla, Krishna, and across Andhra Pradesh, <strong>VASU GENIX SOLAR</strong> helps rice mill owners evaluate daytime milling electricity consumption, connected load (HP/kVA), and high-bay godown roof area to reduce monthly power bills.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-orange-400 block">30 kW – 100 kW+ Sizing</strong>
                  <span className="text-slate-300">
                    Tailored to match hullers, whiteners, silky polishers, and color sorters.
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-green-400 block">Husk-Ash & Dust Mitigation</strong>
                  <span className="text-slate-300">
                    Dedicated module cleaning walkways and water lines to maintain peak output.
                  </span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectSystemFromCard(50)}
                  className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  Calculate 50 kW / 100 kW Rice Mill EMI
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("rice-mill-solar")}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm cursor-pointer"
                >
                  Read Rice Mill Assessment Guide
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=85"
                alt="Rice Mill Solar Installation"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-white/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3.5 py-1.5 rounded-full">
                Engineering Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Representative Solar Configurations
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["All", "Residential", "Commercial", "Industrial", "Agricultural", "Rice Mill"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      projectFilter === cat
                        ? "bg-[#0284C7] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-[#0284C7] text-white text-xs font-bold">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold">
                        Sample Spec
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-600 mt-2">{project.overview}</p>
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-1 text-slate-700">
                      <div>
                        <strong>Location:</strong> {project.location}
                      </div>
                      <div>
                        <strong>Capacity:</strong> {project.capacity}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-[#0284C7] hover:text-white text-slate-800 font-bold text-xs transition cursor-pointer"
                  >
                    View System Configuration
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0284C7] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact-enquiry-section" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">{renderAddressAndMapBlock()}</div>
            <div className="lg:col-span-8">
              <ContactSection prefilledSummary={quotationSummary} />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderDedicatedSolutionPage = (solutionId) => {
    const sol = SOLUTIONS_DATA.find((s) => s.id === solutionId) || SOLUTIONS_DATA[0];
    return (
      <div className="pt-24 pb-20 bg-slate-50">
        <section className="bg-gradient-to-r from-[#042f4b] to-[#15803D] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-300">
                {SITE_CONFIG.companyName} • {sol.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold">{sol.title}</h1>
              <p className="text-sky-100 text-base sm:text-lg">{sol.shortDesc}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo("home", "emi-calculator-section")}
                  className="px-6 py-3 rounded-xl bg-[#F97316] text-white font-bold text-sm cursor-pointer"
                >
                  Open Solar EMI Calculator
                </button>
                <a
                  href={SITE_CONFIG.telHref}
                  className="px-6 py-3 rounded-xl bg-white/15 text-white font-bold text-sm"
                >
                  Call {SITE_CONFIG.contactDetails.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <img
                src={sol.image}
                alt={sol.title}
                className="w-full h-64 sm:h-72 object-cover rounded-3xl border border-white/20 shadow-xl"
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Engineering Specifications</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {sol.engineeringDetails}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {sol.highlights.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <SolarEMICalculator
            selectedKw={selectedSystemKw}
            onSelectKw={setSelectedSystemKw}
            pricingConfig={pricingConfig}
            onUpdatePricingConfig={handleUpdatePricingConfig}
            generationAssumptions={generationAssumptions}
            onUpdateGenerationAssumptions={setGenerationAssumptions}
            onGetSolarQuotation={handleGetSolarQuotation}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0284C7] selection:text-white overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || currentPage !== "home"
            ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
            : "bg-gradient-to-b from-slate-950/85 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 text-left cursor-pointer"
            >
              <BrandLogo variant="header" />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold transition cursor-pointer ${
                currentPage === "home" ? "text-[#F97316]" : "text-white hover:text-sky-300"
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo("home", "solar-packages-section")}
              className="px-3 py-2 rounded-lg text-xs xl:text-sm font-bold text-white hover:text-sky-300 transition cursor-pointer"
            >
              3 kW–100 kW Systems
            </button>
            <button
              type="button"
              onClick={() => navigateTo("home", "emi-calculator-section")}
              className="px-3 py-2 rounded-lg text-xs xl:text-sm font-bold text-green-400 hover:text-green-300 transition cursor-pointer"
            >
              Solar EMI Calculator
            </button>

            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigateTo("solutions")}
                className="px-3 py-2 rounded-lg text-xs xl:text-sm font-bold text-white hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 space-y-1">
                    {[
                      { id: "residential-solar", label: "Residential Solar (From 3 kW)" },
                      { id: "commercial-solar", label: "Commercial Solar Systems" },
                      { id: "industrial-solar", label: "Industrial & Factory Solar" },
                      { id: "rice-mill-solar", label: "Rice Mill Solar Solutions" },
                      { id: "solutions", label: "All Solar Solutions" }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => navigateTo(s.id)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-white hover:bg-[#0284C7] transition cursor-pointer"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigateTo("rice-mill-solar")}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold transition cursor-pointer ${
                currentPage === "rice-mill-solar" ? "text-[#F97316]" : "text-white hover:text-sky-300"
              }`}
            >
              Rice Mill Solar
            </button>
            <button
              type="button"
              onClick={() => navigateTo("projects")}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold transition cursor-pointer ${
                currentPage === "projects" ? "text-[#F97316]" : "text-white hover:text-sky-300"
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => navigateTo("contact")}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold transition cursor-pointer ${
                currentPage === "contact" ? "text-[#F97316]" : "text-white hover:text-sky-300"
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={SITE_CONFIG.telHref}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/15"
            >
              <Phone className="w-3.5 h-3.5 text-green-400" />
              <span>{SITE_CONFIG.phoneRaw}</span>
            </a>

            <button
              type="button"
              onClick={() => navigateTo("home", "contact-enquiry-section")}
              className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Get a Solar Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE_CONFIG.telHref}
              aria-label="Call VASU GENIX SOLAR"
              className="p-2.5 rounded-xl bg-[#16A34A] text-white"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2.5 rounded-xl bg-white/10 text-white border border-white/20"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-4 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
            <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
              <BrandLogo variant="header" />
            </div>

            {[
              { label: "Home", action: () => navigateTo("home") },
              {
                label: "Solar Systems (3 kW – 100 kW)",
                action: () => navigateTo("home", "solar-packages-section")
              },
              {
                label: "Solar EMI & Savings Calculator",
                action: () => navigateTo("home", "emi-calculator-section")
              },
              { label: "Residential Solar", action: () => navigateTo("residential-solar") },
              { label: "Commercial Solar", action: () => navigateTo("commercial-solar") },
              { label: "Industrial Solar", action: () => navigateTo("industrial-solar") },
              { label: "Rice Mill Solar Solutions", action: () => navigateTo("rice-mill-solar") },
              { label: "Projects Gallery", action: () => navigateTo("projects") },
              { label: "Blog & Solar Guides", action: () => navigateTo("blog") },
              { label: "Contact VASU GENIX (Tenali)", action: () => navigateTo("contact") }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-orange-400" />
              </button>
            ))}

            <div className="pt-3 grid grid-cols-2 gap-2.5">
              <a
                href={SITE_CONFIG.telHref}
                className="py-3 rounded-xl bg-[#0284C7] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" /> Call {SITE_CONFIG.phoneRaw}
              </a>
              <a
                href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
                  SITE_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-xl bg-[#16A34A] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {currentPage === "home" && renderHomePage()}
        {currentPage === "about" && (
          <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
                About {SITE_CONFIG.companyName}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
                {SITE_CONFIG.companyName} — {SITE_CONFIG.tagline}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
                Based in <strong>Gandhi Chowk, Tenali, Andhra Pradesh</strong>, VASU GENIX SOLAR provides end-to-end solar photovoltaic engineering, procurement, installation, and maintenance services for homeowners, commercial institutions, agricultural farms, and rice mills.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">{renderAddressAndMapBlock()}</div>
              <div className="lg:col-span-7">
                <ContactSection prefilledSummary={quotationSummary} />
              </div>
            </div>
          </div>
        )}
        {currentPage === "solutions" && renderDedicatedSolutionPage("residential-solar")}
        {currentPage === "residential-solar" && renderDedicatedSolutionPage("residential-solar")}
        {currentPage === "commercial-solar" && renderDedicatedSolutionPage("commercial-solar")}
        {currentPage === "industrial-solar" && renderDedicatedSolutionPage("industrial-solar")}
        {currentPage === "rice-mill-solar" && renderDedicatedSolutionPage("rice-mill-solar")}
        {currentPage === "projects" && (
          <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                VASU GENIX SOLAR Project Configurations
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Explore sample residential, commercial, industrial, and rice mill configurations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 p-6 space-y-4">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-2xl" />
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-[#0369A1] text-xs font-bold">
                    {p.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
                  <p className="text-xs text-slate-600">{p.overview}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(p)}
                    className="w-full py-2.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === "blog" && (
          <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              VASU GENIX SOLAR Knowledge Center & Guides
            </h1>
            {selectedBlog ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
                <button
                  type="button"
                  onClick={() => setSelectedBlog(null)}
                  className="text-xs font-bold text-[#0284C7] flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Articles
                </button>
                <h2 className="text-2xl sm:text-3xl font-extrabold">{selectedBlog.title}</h2>
                {selectedBlog.content.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{sec.heading}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{sec.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_ARTICLES.map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <img src={b.image} alt={b.title} className="w-full h-44 object-cover rounded-2xl mb-4" />
                      <span className="text-xs font-bold text-[#16A34A]">{b.category}</span>
                      <h2 className="text-lg font-bold text-slate-900 mt-1">{b.title}</h2>
                      <p className="text-xs text-slate-600 mt-2">{b.excerpt}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedBlog(b)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-xs font-bold transition cursor-pointer"
                    >
                      Read Full Guide
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {currentPage === "contact" && (
          <div className="pt-28 pb-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">{renderAddressAndMapBlock()}</div>
              <div className="lg:col-span-8">
                <ContactSection prefilledSummary={quotationSummary} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo variant="footer" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                {SITE_CONFIG.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Premium rooftop, commercial, industrial, and rice mill solar power installations starting from 3 kW. Serving Tenali, Andhra Pradesh, and India.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Quick Links</h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button type="button" onClick={() => navigateTo("home")} className="hover:text-orange-400 cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo("home", "solar-packages-section")}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    3 kW – 100 kW Packages
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo("home", "emi-calculator-section")}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    Solar EMI Calculator
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("projects")} className="hover:text-orange-400 cursor-pointer">
                    Projects Gallery
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("contact")} className="hover:text-orange-400 cursor-pointer">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                Solar Solutions
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button type="button" onClick={() => navigateTo("residential-solar")} className="hover:text-orange-400 cursor-pointer">
                    Residential Rooftop Solar (3 kW+)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("commercial-solar")} className="hover:text-orange-400 cursor-pointer">
                    Commercial Solar Systems
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("industrial-solar")} className="hover:text-orange-400 cursor-pointer">
                    Industrial & Factory Solar
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo("rice-mill-solar")} className="hover:text-orange-400 cursor-pointer">
                    Rice Mill Solar Solutions
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                Contact VASU GENIX SOLAR
              </h3>
              <div className="space-y-2.5 text-xs">
                <p>
                  <strong className="text-white block">Address:</strong>
                  {SITE_CONFIG.contactDetails.address}
                </p>
                <p>
                  <strong className="text-white block">Phone:</strong>
                  <a href={SITE_CONFIG.telHref} className="text-sky-400 font-bold hover:underline">
                    {SITE_CONFIG.contactDetails.phoneDisplay}
                  </a>
                </p>
                <p>
                  <strong className="text-white block">WhatsApp:</strong>
                  <a
                    href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
                      SITE_CONFIG.whatsapp.defaultMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-bold hover:underline"
                  >
                    {SITE_CONFIG.contactDetails.whatsappDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={SITE_CONFIG.contactDetails.googleMapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-400 font-bold hover:underline mt-1"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View Tenali Map Directions
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} {SITE_CONFIG.companyName} ({SITE_CONFIG.tagline}). Gandhi Chowk, Tenali, Andhra Pradesh, India.
            </div>
            <div className="flex items-center gap-4">
              <a href={SITE_CONFIG.telHref} className="hover:text-white">
                Call: {SITE_CONFIG.phoneRaw}
              </a>
              <span>•</span>
              <a
                href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
                  SITE_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp: +91 {SITE_CONFIG.phoneRaw}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={`${SITE_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
            SITE_CONFIG.whatsapp.defaultMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with VASU GENIX SOLAR on WhatsApp"
          className="flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm shadow-2xl border border-white/25 transition transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span>WhatsApp: {SITE_CONFIG.phoneRaw}</span>
        </a>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-60">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/75 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                Sample Reference Configuration
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">{selectedProject.title}</h3>
              <p className="text-sm text-slate-600">{selectedProject.overview}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(selectedProject.configuration).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="uppercase text-[#0284C7] block">{k}</strong>
                    <span className="text-slate-800 font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    navigateTo("home", "emi-calculator-section");
                  }}
                  className="px-5 py-2 rounded-xl bg-[#F97316] text-white text-xs font-bold"
                >
                  Calculate EMI for Similar System
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}