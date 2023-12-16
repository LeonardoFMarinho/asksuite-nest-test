import { BadRequestException } from '@nestjs/common';

export class DateUtil {
  static validateDate(date: string): Date {
    const dateFormat = new Date(date);
    if (isNaN(dateFormat.getMonth())) {
      throw new BadRequestException('Invalid Date');
    }
    return dateFormat;
  }

  static validateDatesPayload({ checkin, checkout }) {
    if (!checkin || !checkout) {
      throw new BadRequestException("Checkin and checkout can't be empty");
    }
    const dateFormatCheckin = DateUtil.validateDate(checkin);
    const dateFormatCheckout = DateUtil.validateDate(checkout);

    this.diffDates(dateFormatCheckin, dateFormatCheckout);
  }

  static diffDates(checkin: Date, checkout: Date) {
    if (checkin > checkout) {
      throw new BadRequestException(
        'checkin date is higher than checkout date',
      );
    }
  }

  static formatDate(checkin: string, checkout: string) {
    const checkinValidated = checkin.split('-').reverse().join('-');
    const checkoutValidated = checkout.split('-').reverse().join('-');
    return { checkinValidated, checkoutValidated };
  }
}
