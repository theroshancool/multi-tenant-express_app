const response = await auth.api.spMetadata({
  query: {
    providerId: "saml-provider",
    format: "xml", // or "json"
  },
});

const metadataXML = await response.text();
console.log(metadataXML);
