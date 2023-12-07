import React, { useEffect } from "react";

function GoogleTransiltor() {
  //   const googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en",
  //         autoDisplay: false,
  //       },
  //       "google_translate_element"
  //     );
  //   };

  //   useEffect(() => {
  //     if (!window.googleTranslateElementInit) {
  //       var addScript = document.createElement("script");
  //       addScript.setAttribute(
  //         "src",
  //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //       );
  //       document.body.appendChild(addScript);
  //       window.googleTranslateElementInit = googleTranslateElementInit;
  //     }
  //   }, []);
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",  // set default language when page loaded
        includedLanguages: "en,ar",  // include both English (en) and Arabic (ar)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
}

export default GoogleTransiltor;
