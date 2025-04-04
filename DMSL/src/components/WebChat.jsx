import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress scripts
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/04/01/11/20250401112319-KA586TFY.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      // Cleanup on unmount (optional)
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // no visible UI component needed
};

export default Chatbot;
