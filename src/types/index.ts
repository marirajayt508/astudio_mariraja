export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      city: string;
    };
    company: {
      name: string;
    };
    username: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
  }
