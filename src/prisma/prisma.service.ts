import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { envs } from 'src/config/envs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('Products Database')

    constructor() {
        try {
            const pool = new Pool({ connectionString: envs.databaseUrl });
            const adapter = new PrismaPg(pool);
            super({ adapter });
            this.logger.log('Connected to Products Database');

        } catch (error) {
            super();
            this.logger.error('Failed to connect to Products Database', error);
        }
    }

    async onModuleInit() {
        await this.$connect();
    }
}
