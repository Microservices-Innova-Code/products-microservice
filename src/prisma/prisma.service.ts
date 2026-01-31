import { Injectable, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { envs } from 'src/config/envs';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

    private readonly logger = new Logger('Products Database')

    constructor() {
        const pool = new Pool({ connectionString: envs.databaseUrl });
        const adapter = new PrismaPg(pool);
        super({ adapter });
        this.logger.log('Connected to Products Database');
    }
}
