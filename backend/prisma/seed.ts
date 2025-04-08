import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function up() {
   await prisma.brand.create({
      data: {
         id: 1,
         name: 'Vxe',
      },
   });

   await prisma.category.create({
      data: {
         id: 1,
         name: 'Ігрові миші',
      },
   });

   await prisma.category.create({
      data: {
         id: 2,
         name: 'Ігрові килими',
      },
   });

   await prisma.tag.create({
      data: {
         id: 1,
         name: 'Тренди',
      },
   });

   await prisma.tag.create({
      data: {
         id: 2,
         name: 'Новинки',
      },
   });

   await prisma.tag.create({
      data: {
         id: 3,
         name: 'Рекомендоване',
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_White.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
            ],
         },
      },
   });

   await prisma.product.create({
      data: {
         name: 'Vxe mad r',
         images: [
            'https://www.atk.store/cdn/shop/files/VXE_MAD_R_Major_Black.jpg?v=1741849048',
         ],
         description:
            'Vxe mad r — це ультралегка бездротова ігрова миша з сенсором PAW3950, підтримкою трьох режимів підключення та мінімальною вагою всього 36 грамів. Ідеальний вибір для кіберспортсменів.',
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
                  name: 'Vxe mad r major +',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r major',
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
                        { key: 'Сенсор', value: 'PAW3950' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r +',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '42 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
                     ],
                  },
               },
               {
                  name: 'Vxe mad r',
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
                        { key: 'Сенсор', value: 'PAW3395' },
                        { key: 'Мікроконтролер', value: 'NORDIC 52840' },
                        {
                           key: 'Частота опитування',
                           value: '1-8К',
                        },
                        { key: 'Вага:', value: '36 Г' },
                        { key: 'Покриття:', value: 'Ice-feeling' },
                        { key: 'Розміри:', value: '120.1мм × 63.2мм × 38.1мм' },
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
