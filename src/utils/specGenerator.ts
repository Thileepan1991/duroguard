// Specification generator & quotation helper for Ferrolux
import { BRAND_CONFIG } from '../config/brandConfig';
import type { DoorProduct, FinishOption, HandleOption, DimensionOption } from '../config/productsData';

export interface ConfigurationState {
  product: DoorProduct;
  finish: FinishOption;
  handle: HandleOption;
  dimension: DimensionOption;
  hasSmartLock: boolean;
  hasLedAccent: boolean;
  hasAcousticCore: boolean;
}

export interface EnquirySubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  clientType: 'Private Homeowner' | 'Architect / Interior Designer' | 'General Contractor' | 'Commercial Developer';
  projectLocation: string;
  estimatedTimeline: string;
  notes: string;
  configuration: {
    productName: string;
    finishName: string;
    dimensions: string;
    handle: string;
    smartLock: boolean;
    ledAccent: boolean;
    acousticCore: boolean;
    securityClass: string;
    fireRating: string;
  };
}

export function generateWhatsAppLink(state: ConfigurationState, customNote?: string): string {
  const phone = BRAND_CONFIG.contact.whatsappNumber;
  const message = `Hello ${BRAND_CONFIG.brandName} Concierge,%0A%0A` +
    `I would like to inquire about an architectural entrance door for my project:%0A` +
    `• *Model*: ${state.product.name} (${state.product.series})%0A` +
    `• *Category*: ${state.product.category.toUpperCase()}%0A` +
    `• *Finish*: ${state.finish.name}%0A` +
    `• *Dimensions*: ${state.dimension.label}%0A` +
    `• *Hardware*: ${state.handle.name}%0A` +
    `• *Smart Biometric Lock*: ${state.hasSmartLock ? 'Yes (Integrated Face/Fingerprint)' : 'Mechanical Standard'}%0A` +
    `• *Recessed LED Channel*: ${state.hasLedAccent ? 'Yes (2700K Warm Architectural)' : 'No'}%0A` +
    `• *Security Grade*: ${state.product.securityClass}%0A` +
    `• *Fire Rating*: ${state.product.fireRating}%0A%0A` +
    (customNote ? `*Note*: ${encodeURIComponent(customNote)}%0A%0A` : '') +
    `Please provide technical CAD drawings, pricing schedule, and showroom consultation availability.`;

  return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
}

export function generateSpecDocument(state: ConfigurationState): string {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const docId = `FX-${Math.floor(100000 + Math.random() * 900000)}`;

  return `================================================================================
${BRAND_CONFIG.brandName.toUpperCase()} ARCHITECTURAL PORTALS — SPECIFICATION SCHEDULE
${BRAND_CONFIG.brandTagline.toUpperCase()}
Document Ref: ${docId} | Issued: ${dateStr}
================================================================================

1. SYSTEM CLASSIFICATION
   System Type:          ${state.product.name}
   Architectural Series: ${state.product.series}
   Kinematic Operation:  ${state.product.pivotType}
   Primary Metallurgy:   ${state.finish.tag} (${state.finish.name})
   Finish Specification: ${state.finish.description}

2. DIMENSIONAL PARAMETERS
   Clear Opening Width:  ${state.dimension.widthMm} mm
   Clear Opening Height: ${state.dimension.heightMm} mm
   Overall Leaf Depth:   ${state.dimension.thicknessMm} mm
   Estimated Leaf Mass:  Approx. ${state.product.leafWeightKg} kg (balanced by offset hydraulic spindle)
   Max Permissible Span: ${state.product.maxDimensions}

3. HARDWARE & INGRESS SPECIFICATIONS
   Pull Architecture:    ${state.handle.name}
   Handle Material:      ${state.handle.material}
   Handle Length:        ${state.handle.lengthMm} mm
   Locking Mechanism:    ${state.product.lockingSystem}
   Biometric Control:    ${state.hasSmartLock ? 'Sub-second optical/capacitive scanner + KNX/Crestron integration' : 'High-security mechanical cylinder with magnetic anti-drill shield'}
   Architectural Illum:  ${state.hasLedAccent ? 'Integrated 2700K warm linear LED contour with hidden transformer' : 'Standard passive reveal'}

4. CERTIFIED TECHNICAL METRICS (VERIFIED)
   Burglar Resistance:   ${state.product.securityClass}
   Fire Resistance:      ${state.product.fireRating}
   Acoustic Attenuation: ${state.product.acousticRating}
   Thermal Transmittance:${state.product.thermalInsulation}
   Air Permeability:     Class 4 (EN 12207)
   Water Tightness:      Class 9A (EN 12208)
   Wind Load Resistance: Class C5 (EN 12210)

5. INSTALLATION & SUBFRAME
   Subframe System:      Electro-galvanized cold-formed tubular steel with thermal barrier
   Pivot Spindle:        Ground-recessed stainless steel hydraulic pivot with 3D alignment
   Perimeter Sealing:    Double continuous EPDM magnetic compressed gaskets + motorized drop seal

6. ATELIER & CONCIERGE CONTACT
   Brand:                ${BRAND_CONFIG.brandName}
   Headquarters:         ${BRAND_CONFIG.contact.headquarters}
   Direct Concierge:     ${BRAND_CONFIG.contact.phone}
   Email:                ${BRAND_CONFIG.contact.email}
   WhatsApp:             ${BRAND_CONFIG.contact.whatsappDisplay}

================================================================================
CONFIDENTIAL SPECIFICATION DATA — FOR ARCHITECTURAL & ENGINEERING USE ONLY
================================================================================`;
}

export function downloadSpecAsFile(state: ConfigurationState) {
  const content = generateSpecDocument(state);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `FERROLUX-SpecSheet-${state.product.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function saveEnquiryToStorage(enquiry: EnquirySubmission) {
  try {
    const existingStr = localStorage.getItem('ferrolux_enquiries') || '[]';
    const list: EnquirySubmission[] = JSON.parse(existingStr);
    list.unshift(enquiry);
    localStorage.setItem('ferrolux_enquiries', JSON.stringify(list));
  } catch {
    // LocalStorage fallback
  }
}
