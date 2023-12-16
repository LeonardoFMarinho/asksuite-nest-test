import { Test, TestingModule } from '@nestjs/testing';
import { DateUtil } from './DateUtil';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../../../app.module';
let test: TestingModule;
beforeEach(async () => {
  test = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AppModule],
    providers: [],
  }).compile();
});
afterAll(async () => await test.close());

describe('Date Util', () => {
  it('shoud be able to accept checkin and checkout dates', () => {
    const checkin = '2023-12-12';
    const checkout = '2023-12-15';

    const result = DateUtil.formatDate(checkin, checkout);

    expect(result.checkinValidated).toBe('12-12-2023');
  });

  //   it('shoud be able to reject checkin date higher checkout', async () => {
  //     const checkin = new Date('2023-12-16');
  //     const checkout = new Date('2023-12-15');

  //     await expect(DateUtil.diffDates(checkin, checkout)).rejects.toBeInstanceOf(
  //       BadRequestException,
  //     );
  //   });
});
