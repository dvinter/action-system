import chalk from 'chalk';
import { BrazilianDate } from './brazilian-date';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

type LogTypes = 'warning' | 'error' | 'success' | 'info';

export class Logger {
  private static writeLogFile(type: LogTypes, message: string) {
    const now = BrazilianDate.getNow();
    const logFormat = BrazilianDate.getLogFormat(now);
    const logsPath = `${__dirname}/../../../logs/`;
    const typePath = `${logsPath}/${type}`;

    if (!existsSync(typePath)) {
      mkdirSync(typePath, { recursive: true });
    }

    writeFileSync(`${typePath}/${now}.log`, `${logFormat} - ${message}\n`, {
      flag: 'a',
    });
  }

  static success(message: string) {
    console.log(chalk.bgGreen.black(message));
    this.writeLogFile('success', message);
  }

  static error(message: string) {
    console.log(chalk.bgRed.black(message));
    this.writeLogFile('error', message);
  }

  static warning(message: string) {
    console.log(chalk.bgYellow.black(message));
    this.writeLogFile('warning', message);
  }

  static info(message: string) {
    console.log(chalk.bgCyan.black(message));
    this.writeLogFile('info', message);
  }
}
