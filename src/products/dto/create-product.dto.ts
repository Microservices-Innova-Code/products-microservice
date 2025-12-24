import { Prisma } from 'src/generated/prisma/browser';

export class CreateProductDto implements Prisma.ProductCreateInput {

    name: string;

    slug: string;

    description: string;

    priceSale: number;

    pricePurchase: number;

    stock: number;
}
