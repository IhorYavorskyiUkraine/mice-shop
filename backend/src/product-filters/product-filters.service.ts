import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      }
   }

   async getFilteredProducts(args: ProductFiltersArgs) {
      try {
         const { tags, brands, price, colors, specs } = args;

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
         });

         return products;
      } catch (e) {
         console.error(e);
         throw new InternalServerErrorException(
            'Error fetching products. Please try again later.',
         );
      }
   }
}
