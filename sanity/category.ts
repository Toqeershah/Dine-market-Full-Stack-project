export default {
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The name of the product category",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // You can generate the slug from the 'title' field
        maxLength: 100, // Adjust the maximum length as needed
      },
      description: "The URL-friendly version of the category name",
    },
    // Other fields specific to your product category schema
  ],
};
