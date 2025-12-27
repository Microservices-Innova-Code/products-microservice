import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
    
    const logger = new Logger('Products Microservice');

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.NATS,
            options: {
                servers: envs.natsServer,
                name: 'PRODUCTS_MICROSERVICE',
            }
        }
    );

    await app.listen();

    logger.log('Products Microservice is running on Nats Server')

}
bootstrap();
