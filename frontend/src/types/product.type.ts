import { Brand } from './brand.type';
import { Category } from './category.type';
import { Model } from './model.type';
import { Review } from './review.type';
import { Specs } from './specs.type';
import { ProductTag } from './tag.type';

export type Product = {
   id: number;
   name: string;
   image: string;
   generalSpecs: Specs[];
   rating: number;
   models: Model[];
   description: string;
   reviews: Review[];
   brand: Brand;
   brandId: number;
   category: Category;
   categoryId: number;
   tags: ProductTag[];
   views: number;
   createdAt: Date;
   updatedAt: Date;
};
