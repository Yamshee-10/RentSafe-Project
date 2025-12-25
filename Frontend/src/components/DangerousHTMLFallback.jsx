// src/components/DangerousHTMLFallback.jsx
import React from "react";

export default function DangerousHTMLFallback({ html = "", onLoad }) {
  React.useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
