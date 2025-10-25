import { IProduct, ICategory, IApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Helper для формування правильних URL без подвійних слешів
function buildUrl(path: string): string {
  const baseUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Type assertion helper для TypeScript з Next.js кешуванням
type NextFetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

// Helper function для обробки помилок
async function handleResponse<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    // 404 вже обробляється вище, тут тільки інші помилки
    if (response.status !== 404) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    return null;
  }
  return response.json();
}

// Серверний API клієнт з використанням Next.js fetch
export const serverApiClient = {
  // Продукти
  async getProductBySlug(slug: string): Promise<IProduct | null> {
    try {
      const response = await fetch(buildUrl(`/products/slug/${slug}`), {
        next: { revalidate: 60 }, // Кешування на 60 секунд
      } as NextFetchOptions);

      if (response.status === 404) {
        // 404 - нормально, оскільки slug може бути категорією
        return null;
      }

      return handleResponse<IProduct>(response);
    } catch (error) {
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
      const searchParams = new URLSearchParams();
      if (params?.skip !== undefined)
        searchParams.append("skip", params.skip.toString());
      if (params?.limit !== undefined)
        searchParams.append("limit", params.limit.toString());
      if (params?.category) searchParams.append("category", params.category);

      const queryString = searchParams.toString();
      const url = buildUrl(`/products/${queryString ? `?${queryString}` : ""}`);

      const response = await fetch(url, {
        next: { revalidate: 60 }, // Кешування на 60 секунд
      } as NextFetchOptions);

      return handleResponse<IApiResponse<IProduct>>(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  },

  // Категорії
  async getCategoryBySlug(slug: string): Promise<ICategory | null> {
    try {
      const response = await fetch(buildUrl(`/categories/slug/${slug}`), {
        next: { revalidate: 3600 }, // Кешування на 1 годину (категорії рідко змінюються)
      } as NextFetchOptions);

      if (response.status === 404) {
        // 404 - нормально, оскільки slug може бути продуктом
        return null;
      }

      return handleResponse<ICategory>(response);
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  },

  async getCategoryById(id: number): Promise<ICategory | null> {
    try {
      const response = await fetch(buildUrl(`/categories/${id}`), {
        next: { revalidate: 3600 }, // Кешування на 1 годину
      } as NextFetchOptions);

      return handleResponse<ICategory>(response);
    } catch (error) {
      console.error("Error fetching category by id:", error);
      return null;
    }
  },

  async getAllCategories(): Promise<IApiResponse<ICategory> | null> {
    try {
      const response = await fetch(buildUrl("/categories/all"), {
        next: { revalidate: 3600 }, // Кешування на 1 годину
      } as NextFetchOptions);

      return handleResponse<IApiResponse<ICategory>>(response);
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return null;
    }
  },
};
