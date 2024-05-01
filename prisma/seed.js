import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
function getRandomDate() {
    const start = new Date(2019, 0, 1); // 1 Januari 2019
    const end = new Date(); // Hari ini

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Membuat 2 salesperson
const salesperson1 = await prisma.salespersons.create({
    data: {
        SalesPersonName: "Salesperson 1",
    },
});

const salesperson2 = await prisma.salespersons.create({
    data: {
        SalesPersonName: "Salesperson 2",
    },
});

// generate new product
const product = await prisma.products.create({
    data: {
        ProductName: "Product 1",
    },
});


// Membuat 2 juta penjualan
for (let i = 0; i < 2000000; i++) {
    // Alternatif antara 2 salesperson
    const salesperson = i % 2 === 0 ? salesperson1 : salesperson2;

    await prisma.sales.create({
        data: {
            SalesDate: getRandomDate(),
            ProductID: product.ProductID, // asumsikan produk dengan ID 1 sudah ada
            SalesAmount: 1000,
            SalesPersonID: salesperson.SalesPersonID,
        },
    });

    if (i % 1000 === 0) {
        console.log(`Seeded ${i} records.`);
    }
}