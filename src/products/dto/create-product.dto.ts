import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'Nombre debe ser un texto' })
    name: string;

    @IsNumber({}, { message: 'Precio debe ser un número' })
    price: number;

    @IsString({ message: 'La descripcion debe ser un texto' })
    description: string;
}
