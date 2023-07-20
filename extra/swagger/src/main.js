import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import SwaggerUIStandalonePreset from "swagger-ui/dist/swagger-ui-standalone-preset";

SwaggerUI({
  urls: [
    {
      name: "IGN completion",
      url: "/ign-completion.yaml",
    },

    {
      name: "IGN geocodage",
      url: "/ign-geocodage.yaml",
    },
    {
      name: "Nominatim",
      url: "/nominatim.yaml",
    },
  ],
  dom_id: "#root",
  deepLinking: true,
  presets: [SwaggerUI.presets.apis, SwaggerUIStandalonePreset],
  plugins: [SwaggerUI.plugins.DownloadUrl],
  layout: "StandaloneLayout",
});
