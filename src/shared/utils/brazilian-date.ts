import moment from 'moment';

export class BrazilianDate {
  static monthToLiteral(month: number) {
    const strategies = {
      0: 'Janeiro',
      1: 'Fevereiro',
      2: 'Março',
      3: 'Abril',
      4: 'Maio',
      5: 'Junho',
      6: 'Julho',
      7: 'Agosto',
      8: 'Setembro',
      9: 'Outubro',
      10: 'Novembro',
      11: 'Dezembro',
    };

    return strategies[month];
  }

  static weekdayToLiteral(weekday: number) {
    const strategies = {
      0: 'Domingo',
      1: 'Segunda',
      2: 'Terça',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
      6: 'Sábado',
    };

    return strategies[weekday];
  }

  static getNow(
    date: Date = new Date(),
    expectedFormat: string = 'DD-MM-YYYY'
  ): string {
    const nowISOString = date.toISOString();

    const dateFormat = moment(nowISOString, `YYYY-MM-DD hh:mm:ss`).format(
      expectedFormat
    );

    // return dateFormat.toLocaleString();
    return dateFormat;
  }

  static getLogFormat(date: string, dateFormat: string = 'DD-MM-YYYY') {
    const now = moment(date, dateFormat);
    const day = now.get('D');
    const month = now.get('M');
    const year = now.get('y');
    const weekday = now.get('weekday');

    const literalMonth = this.monthToLiteral(month);
    const literalWeekday = this.weekdayToLiteral(weekday);

    return `${literalWeekday} ${day} de ${literalMonth} de ${year}`;
  }
}
