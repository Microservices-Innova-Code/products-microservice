import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    private products = [
        { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 100 },
        { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 200 },
        { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 300 },
    ];

    create(createProductDto: CreateProductDto) {

        this.products.push({
            id: this.products.length + 1,
            ...createProductDto,

            // name: createProductDto.name,
            // price: createProductDto.price,
            // description: createProductDto.description,
        })

        return {
            message: 'Producto creado exitosamente',
        }
    }

    findAll() {

        return {
            products: this.products,
        };
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        const updatedProducts = this.products.filter(product => product.id !== id);
        this.products = updatedProducts;
        
        return {
            message: `Producto con id ${id} eliminado exitosamente`,
        }
    }
}
