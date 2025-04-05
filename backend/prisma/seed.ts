import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function up() {
   await prisma.brand.create({
      data: {
         id: 1,
         name: 'VXE',
      },
   });

   await prisma.category.create({
      data: {
         id: 1,
         name: 'Ігрові миші',
      },
   });

   await prisma.tag.create({
      data: {
         id: 1,
         name: 'ТРЕНДИ',
      },
   });

   await prisma.tag.create({
      data: {
         id: 2,
         name: 'НОВИНКИ',
      },
   });

   await prisma.tag.create({
      data: {
         id: 3,
         name: 'РЕКОМЕНДОВАНЕ',
      },
   });

   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });
   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });
   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'VXE MAD R',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE MAD R — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE MAD R MAJOR +',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R MAJOR',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R +',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'VXE R1',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'VXE R1 — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
         brand: {
            connect: { id: 1 },
         },
         tags: {
            create: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
         },
         category: { connect: { id: 1 } },
         models: {
            create: [
               {
                  name: 'VXE R1 SE+',
                  price: 79,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE R1',
                  price: 76,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3950' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE R1 PRO',
                  price: 59,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1-8К',
                        },
                        { key: 'ВАГА:', value: '42 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
               {
                  name: 'VXE MAD R',
                  price: 46,
                  stock: 100,
                  image: 'https://www.atk.store/cdn/shop/files/VXE_MAD_R_White.jpg?v=1741849048',
                  colors: {
                     create: [
                        { name: 'Чорний', hex: '#000000' },
                        { name: 'Білий', hex: '#ffffff' },
                     ],
                  },
                  specs: {
                     create: [
                        { key: 'СЕНСОР', value: 'PAW3395' },
                        { key: 'МIKРOKOНТРOЛЕР', value: 'NORDIC 52840' },
                        {
                           key: 'ЧАСТOТА OПИТУВАННЯ',
                           value: '1К',
                        },
                        { key: 'ВАГА:', value: '36 Г' },
                        { key: 'ПOKРИТТЯ:', value: 'ICE-FEELING' },
                        { key: 'РOЗМІРИ:', value: '120.1ММ × 63.2ММ × 38.1ММ' },
                     ],
                  },
               },
            ],
         },
      },
   });
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE
		"User",
		"Cart",
		"CartItem",
		"Order",
		"Review",
		"Product",
		"Model",
		"Tag",
		"Category",
		"Brand",
		"Specs",
		"Color",
		"RefreshToken",
		"RevokedToken"
		RESTART IDENTITY CASCADE`;
}

async function main() {
   try {
      await down();
      await up();
   } catch (error) {
      console.error(error);
   }
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
