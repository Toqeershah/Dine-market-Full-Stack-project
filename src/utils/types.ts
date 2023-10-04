// export type Product = {
//     id: number,
//     title: string,
//     price: number,
//     tagline: string
//     category: string,
//     image: string
// }
declare interface Product {
  title: string;
  price: number;
  category: string;
  slug: {
    current: string;
  };
  image: string;
}
