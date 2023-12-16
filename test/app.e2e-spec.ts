import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AppModule],
    }).compile();
    process.env.BASE_URL =
      'https://pratagy.letsbook.com.br/D/Reserva?checkin=payload_checkin&checkout=payload_checkout&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022';
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/search (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/search')
      .send({ checkin: '2024-02-18', checkout: '2024-02-28' })
      .expect(201);
  }, 100000);
});
