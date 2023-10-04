import { SchemaTypeDefinition } from "sanity";

export const product: SchemaTypeDefinition = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // You can generate the slug from the 'title' field
      },
      description: "The URL-friendly version of the category name",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }], // Reference the 'productCategory' type
      description: "The category to which this product belongs",
    },
  ],
};
