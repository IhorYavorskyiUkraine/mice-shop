// async function up() {}

// async function down() {
//    await prisma.$executeRaw`TRUNCATE TABLE
// 		"User",
// 		"Cart",
// 		"CartItem",
// 		"Order",
// 		"OrderItem",
// 		"Review",
// 		"Product",
// 		"ProductVariantOption",
// 		"Category",
// 		"ProductCategory",
// 		"ProductBrand",
// 		"DressStyle",
// 		"Size",
// 		"UserAddressBook",
// 		"Address",
// 		"Color",
// 		"ReviewReply",
// 		"ReviewImage",
// 		"WishList",
// 		"WishListItem",
// 		"VerificationCode"
// 		RESTART IDENTITY CASCADE`;
// }

// async function main() {
//    try {
//       await down();
//       await up();
//    } catch (error) {
//       console.error(error);
//    }
// }

// main()
//    .then(async () => {
//       await prisma.$disconnect();
//    })
//    .catch(async e => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//    });
