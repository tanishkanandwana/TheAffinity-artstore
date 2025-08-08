import React, { useEffect, useRef } from "react";

const InstagramEmbed = ({ embedHtml }) => {
  const containerRef = useRef();

  useEffect(() => {
    // Load Instagram embed script once and re-process embeds when html changes
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
      script.onload = () => {
        window.instgrm && window.instgrm.Embeds.process();
      };
    } else {
      window.instgrm.Embeds.process();
    }
  }, [embedHtml]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};

export default InstagramEmbed;
