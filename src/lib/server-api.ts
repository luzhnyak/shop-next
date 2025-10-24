import axios from "axios";
import { IProduct, ICategory, IApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Серверний API клієнт без Redux
const serverApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const serverApiClient = {
  // Продукти
  async getProductBySlug(slug: string): Promise<IProduct | null> {
    try {
      const response = await serverApi.get(`/products/slug/${slug}`);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`Product with slug "${slug}" not found`);
        return null;
      }
      console.error("Error fetching product by slug:", error);
      return null;
    }
  },

  async getProducts(params?: {
    skip?: number;
    limit?: number;
    category?: string;
  }): Promise<IApiResponse<IProduct> | null> {
    try {
      const response = await serverApi.get("/products/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  },

  // Категорії
  async getCategoryBySlug(slug: string): Promise<ICategory | null> {
    try {
      const response = await serverApi.get(`/categories/slug/${slug}`);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`Category with slug "${slug}" not found`);
        return null;
      }
      console.error("Error fetching category by slug:", error);
      return null;
    }
  },

  async getCategoryById(id: number): Promise<ICategory | null> {
    try {
      const response = await serverApi.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category by id:", error);
      return null;
    }
  },

  async getAllCategories(): Promise<IApiResponse<ICategory> | null> {
    try {
      const response = await serverApi.get("/categories/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return null;
    }
  },
};
