import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883', // Recordar revisar puerto
    },
  });
  console.log('🟡 Inicializando microservicio MQTT...');
  await app.startAllMicroservices();
  console.log('🟢 MQTT iniciado correctamente');
  await app.listen(3000);
}
bootstrap();
