import Script from "next/script"

export default function JobPostingSchema() {
  // Example job posting - you can replace with actual job posting
  const jobPosting = {
    title: "Frisör till Affes Salong",
    description:
      "Vi söker en erfaren frisör till vårt team på Affes Salong i Jönköping. Du bör ha minst 3 års erfarenhet och vara specialiserad på herrklippning och skäggvård.",
    datePosted: "2025-05-01T00:00:00+02:00",
    validThrough: "2025-06-30T23:59:59+02:00",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Affes Salong",
      sameAs: "https://affessalong.axiestudio.se",
      logo: "https://affessalong.axiestudio.se/images/logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Barnarpsgatan 31",
        addressLocality: "Jönköping",
        postalCode: "55316",
        addressCountry: "SE",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "SEK",
      value: {
        "@type": "QuantitativeValue",
        value: "30000",
        unitText: "MONTH",
      },
    },
    skills: "Herrklippning, Skäggvård, Kundservice",
    qualifications: "Frisörutbildning, 3+ års erfarenhet",
    educationRequirements: "Frisörutbildning eller motsvarande",
    experienceRequirements: "Minst 3 års erfarenhet som frisör",
    jobBenefits: "Friskvårdsbidrag, Personalrabatt på produkter",
    applicationContact: {
      "@type": "ContactPoint",
      email: "jobb@affessalong.se",
    },
  }

  return (
    <Script
      id="job-posting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          ...jobPosting,
        }),
      }}
    />
  )
}
