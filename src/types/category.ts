export interface ICategoryBase {
  name: string;
  description: string;
}

export interface ICategoryCreate {
  name: string;
  description: string;
}

export interface ICategoryUpdate extends ICategoryBase {
  id: number;
}

export interface ICategory extends ICategoryBase {
  id: number;
}
