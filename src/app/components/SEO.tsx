import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
  const fullTitle = `${title} | MBELGOR - Chaussures Artisanales de Luxe`;

  useEffect(() => {
    // Basic SEO
    document.title = fullTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = keywords;
        document.head.appendChild(meta);
      }
    }

    // Open Graph
    const ogTags = [
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image || "/logo.png" },
      { property: "og:url", content: url || window.location.href },
    ];

    ogTags.forEach((tag) => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (element) {
        element.setAttribute("content", tag.content);
      } else {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        element.setAttribute("content", tag.content);
        document.head.appendChild(element);
      }
    });

  }, [fullTitle, description, keywords, image, url]);

  return null;
}
