export enum Routes {
  HOME = "/",
  ABOUT = "/about",
  CATALOG = "/catalog",
  PRODUCTS = "/admin/products",
  CATEGORIES = "/admin/categories",
  USERS = "/admin/users",
  PROFILE = "/admin/profile",
  SIGN_IN = "/sign-in",
}

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum Locales {
  EN = "en",
  UK = "uk",
}

export enum ColorBtn {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
}

export enum MembershipStatus {
  PENDING_INVITE = "PENDING_INVITE",
  PENDING_REQUEST = "PENDING_REQUEST",
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
  NONE = "NONE",
}

export type ApiParams = {
  id?: number;
  role?: MembershipStatus;
  skip?: number;
  limit?: number;
};

export type HealthCheckTypes = {
  status_code: number;
  detail: string;
  result: string;
};

export interface IInfoResponse {
  detail: string;
}

export type IApiResponse<T> = {
  total: number;
  page: number;
  per_page: number;
  items: T[];
};
