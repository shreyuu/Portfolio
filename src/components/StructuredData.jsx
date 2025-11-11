import React from 'react';
import { Helmet } from 'react-helmet';

const StructuredData = () => {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shreyash Meshram',
        jobTitle: 'Full Stack Developer',
        url: 'https://shreyashmeshram.com',
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
        url: 'https://shreyashmeshram.com',
        name: 'Shreyash Meshram Portfolio',
        description: 'Full-stack developer and CS student portfolio',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://shreyashmeshram.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
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