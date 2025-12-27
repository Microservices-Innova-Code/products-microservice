import 'dotenv/config';
import * as joi from "joi";

interface EnvVars {
    DATABASE_URL: string;
    NATS_SERVER: string;
}

const envSchema = joi.object({
    DATABASE_URL: joi.string().required(),
    NATS_SERVER: joi.string().required(),
}).unknown(true);


const { error, value } = envSchema.validate({
    ...process.env
})

if(error){
    throw new Error('Error en la configuración de las variables de entorno: ' + error.message)
}

const envVars: EnvVars = value;


export const envs = {
    databaseUrl: envVars.DATABASE_URL,
    natsServer: envVars.NATS_SERVER,
} 