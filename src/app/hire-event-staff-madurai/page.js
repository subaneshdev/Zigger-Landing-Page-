import React from 'react';
import EmployerLandingTemplate from '../../components/pages/EmployerLandingTemplate';
import { getEmployerPageData } from '../../data/employerPagesData';
import { generateEmployerMetadata, generateEmployerJsonLd } from '../../lib/employerSeo';

const config = getEmployerPageData('hire-event-staff-madurai');

export const metadata = generateEmployerMetadata(config);

export default function HireEventStaffMaduraiPage() {
  const jsonLd = generateEmployerJsonLd(config);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EmployerLandingTemplate config={config} />
    </>
  );
}
