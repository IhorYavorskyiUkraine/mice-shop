import { Injectable } from '@nestjs/common';
import { GraphqlErrorCode } from 'src/common/errors/graphql-error-codes.enum';
import { throwGraphQLError } from 'src/common/errors/graphql-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ProductFiltersArgs } from './dto/filtered-products.dto';

@Injectable()
export class ProductFiltersService {
   constructor(
      private productService: ProductService,
      private prisma: PrismaService,
   ) {}
   async getAllProductFilters() {
      try {
         const products = await this.productService.getAllProducts({
            limit: 1000,
            offset: 0,
         });

         if (!products) {
            throwGraphQLError('Продукти не знайдені', {
               extensions: {
                  code: GraphqlErrorCode.RESOURCE_NOT_FOUND,
               },
            });
         }

         const tags = new Set(
            products
               .flatMap(product => product.tags ?? [])
               .map(tag => tag?.tag?.name)
               .filter(Boolean),
         );

         const brands = new Set(
            products
               .flatMap(product => product.brand ?? [])
               .map(brand => brand?.name)
               .filter(Boolean),
         );

         const price = {
            min: Math.min(
               ...products
                  .flatMap(product => product.models ?? [])
                  .map(model => model.price)
                  .filter(
                     (price): price is number => typeof price === 'number',
                  ),
            ),
            max: Math.max(
               ...products
                  .flatMap(product => product.models ?? [])
                  .map(model => model.price)
                  .filter(
                     (price): price is number => typeof price === 'number',
                  ),
            ),
         };

         const colors = new Set(
            products
               .flatMap(product => product.models ?? [])
               .flatMap(model => model.colors ?? [])
               .map(color => color?.name)
               .filter(Boolean),
         );

         const specs = new Set(
            products
               .flatMap(product => product.models ?? [])
               .flatMap(model => model.specs ?? [])
               .filter(spec => spec?.key && spec?.value)
               .map(spec => `${spec.key}: ${spec.value}`),
         );

         return {
            tags,
            brands,
            price,
            colors,
            specs,
         };
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async getTotalPages(args: ProductFiltersArgs) {
      try {
         const { tags, brands, price, colors, specs, limit, offset } = args;

         const totalProducts = await this.prisma.product.count({
            where: {
               ...(brands.length && {
                  brand: {
                     name: { in: brands },
                  },
               }),
               ...(tags.length && {
                  tags: {
                     some: {
                        tag: {
                           name: { in: tags },
                        },
                     },
                  },
               }),
               models: {
                  some: {
                     ...(colors.length && {
                        colors: {
                           some: {
                              name: { in: colors },
                           },
                        },
                     }),
                     ...(specs.length && {
                        specs: {
                           some: {
                              AND: specs.map(s => {
                                 const [key, value] = s
                                    .split(':')
                                    .map(str => str.trim());
                                 return {
                                    key,
                                    value,
                                 };
                              }),
                           },
                        },
                     }),
                     price: {
                        gte: price.min,
                        lte: price.max,
                     },
                  },
               },
            },
         });

         const totalPages = Math.ceil(totalProducts / limit);

         const currentPage = offset / limit + 1;

         return { totalPages, totalProducts, currentPage };
      } catch (e) {
         console.error(e);
         throw e;
      }
   }

   async getFilteredProducts(args: ProductFiltersArgs) {
      try {
         const { tags, brands, price, colors, specs, limit, offset, sort } =
            args;

         const products = await this.prisma.product.findMany({
            where: {
               ...(brands.length && {
                  brand: {
                     name: { in: brands },
                  },
               }),
               ...(tags.length && {
                  tags: {
                     some: {
                        tag: {
                           name: { in: tags },
                        },
                     },
                  },
               }),
               models: {
                  some: {
                     ...(colors.length && {
                        colors: {
                           some: {
                              name: { in: colors },
                           },
                        },
                     }),
                     ...(specs.length && {
                        specs: {
                           some: {
                              AND: specs.map(s => {
                                 const [key, value] = s
                                    .split(':')
                                    .map(str => str.trim());
                                 return {
                                    key,
                                    value,
                                 };
                              }),
                           },
                        },
                     }),
                     price: {
                        gte: price.min,
                        lte: price.max,
                     },
                  },
               },
            },
            include: {
               models: true,
            },
            orderBy:
               sort.length && sort[0] === 'rating'
                  ? {
                       [sort[0]]: sort[1],
                    }
                  : undefined,
            take: limit ?? 8,
            skip: offset ?? 0,
         });

         const getMinPrice = (models: { price: number }[]) =>
            Math.min(...models.map(m => m.price));

         if (sort[0] === 'price') {
            products.sort((a, b) => {
               const aMin = getMinPrice(a.models);
               const bMin = getMinPrice(b.models);

               return sort[1] === 'asc' ? aMin - bMin : bMin - aMin;
            });
         }

         const { totalPages, totalProducts, currentPage } =
            await this.getTotalPages(args);

         return { products, totalPages, totalProducts, currentPage };
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
}
