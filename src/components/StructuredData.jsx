import React from 'react';
import { Helmet } from 'react-helmet';

const StructuredData = () => {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shreyash Meshram',
        jobTitle: 'Full Stack Developer',
        url: 'https://shreyasesh-meshram.vercel.app',
        sameAs: [
            'https://github.com/shreyuu',
            'https://linkedin.com/in/shreyuu',
        ],
        knowsAbout: [
            'Web Development',
            'React',
            'JavaScript',
            'Python',
            'Machine Learning',
            'Django',
            'FastAPI',
        ],
        alumniOf: [
            {
                '@type': 'EducationalOrganization',
                name: 'University of Nottingham',
            },
            {
                '@type': 'EducationalOrganization',
                name: 'Sandip Institute of Technology & Research Centre',
            },
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://shreyasesh-meshram.vercel.app',
        name: 'Shreyash Meshram Portfolio',
        description: 'Full-stack developer and CS student portfolio',
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
        </Helmet>
    );
};

export default StructuredData;