import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(createProductDto: CreateProductDto) {
        
        try {
            const slug = createProductDto.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');


            await this.prisma.product.create({
                data: {
                    ...createProductDto,
                    slug,
                }
            })

            return {
                message: 'Product created successfully',
            }
        } catch (error) {
            if( error.code === 'P2002') {
                throw new RpcException({
                    statusCode: 400,
                    message: 'El producto con este nombre ya existe',
                });
            }

            throw new RpcException({
                statusCode: 500,
                message: 'Internal server error desde products ms',
            });
        }
    }

    async findAll() {
        const products = await this.prisma.product.findMany();

        return {
            products,
        };
    }

    async findOne(id: string) {
        const productExists = await this.prisma.product.findUnique({
            where: {
                id: id,
            }
        })

        if (!productExists) {
            throw new RpcException({
                statusCode: 404,
                message: 'No se encontro el producto',
            })
        }

        return {
            product: productExists,
        }

    }

    update(id: string, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.product.delete({
            where: {
                id: id,
            }
        })

        return {
            message: 'Product deleted successfully',
        }

    }
}
