import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title = "DevFinder - Developer Portfolio Platform",
  description = "A modern developer portfolio platform to showcase projects, blog posts, and connect with recruiters.",
  keywords = "developer portfolio, react portfolio, full stack developer, AI/ML, projects showcase, tech blog",
  author = "Prem Patel",
  image = "https://prem-patel22.github.io/DevFinder/logo512.png",
  url = "https://prem-patel22.github.io/DevFinder",
  type = "website"
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="DevFinder" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@prem_patel22" />
      
      {/* Additional SEO */}
      <meta name="apple-mobile-web-app-title" content="DevFinder" />
      <meta name="application-name" content="DevFinder" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Prem Patel",
          "url": url,
          "sameAs": [
            "https://github.com/prem-patel22",
            "https://www.linkedin.com/in/prem-patel-50a59b27a/"
          ],
          "jobTitle": "Full Stack Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Dharmsinh Desai University"
          },
          "knowsAbout": ["React", "Node.js", "Python", "Machine Learning", "Spring Boot"]
        })}
      </script>
    </Helmet>
  );
}

export default SEO;