import {PrismaClient} from "@prisma/client";
import {Elysia} from 'elysia'
import { cors } from '@elysiajs/cors'
import Dog from "./oop.js";


const prisma = new PrismaClient();


const getAnnualSales  = () => {
    return prisma.$queryRaw`
        SELECT YEAR(SalesDate) as year, SUM(SalesAmount) as totalSales
        FROM Sales
        GROUP BY YEAR(SalesDate)
    `;
}

const getMonthlySales = (year) => {
    return prisma.$queryRaw`
        SELECT MONTH(SalesDate) as month, SUM(SalesAmount) as totalSales
        FROM Sales
        WHERE YEAR(SalesDate) = ${year}
        GROUP BY MONTH(SalesDate)
    `;
}


const oop = new Dog("Flexy");
const app = new Elysia().use(cors({
    origin: "*"
})).get(
    ("/annual-sales") , async () => {
        return getAnnualSales();
    }
).get("/monthly-sales/:year",({params})=>{
    const year = parseInt(params.year);
    return getMonthlySales(year);
}).get("/ping" , ()=> "pong").get("/dog", ()=>{
    return oop.speak();
}).listen(4000)


export default app

console.log(`Running at http://${app.server.hostname}:${app.server.port}`)
