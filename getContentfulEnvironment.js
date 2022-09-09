const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-I9yEMZ7hOVy0hib0URJWqc2IgbR_Zsqd6eDe_5qb6CM",
  })

  return contentfulClient
    .getSpace("phmnv82te5rj")
    .then(space => space.getEnvironment("master"))
}