export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};
export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
};
export type CartItem = { product: Product; qty: number };
export type PaymentMethod = "pix" | "card" | "boleto";
export type PaymentStatus =
  | "initial"
  | "processing"
  | "paid"
  | "failed"
  | "expired";
