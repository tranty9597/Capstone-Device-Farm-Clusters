import { CronJob } from 'cron';
import { ClockData } from './Data';
import { Clock, SystemTemperature } from '../models';
import { CronJobConfig } from '../configs';
import { TemperatureProvider } from '../providers';

const IncreaseComsumedElectricNumber = new CronJob('* * * * *', function () {
    const temperature = TemperatureProvider()
    new SystemTemperature().updateSystemTemperature(temperature)
    ClockData.forEach((clock) => {
        new Clock(clock).updateClock(temperature)
    })
}, null, false, CronJobConfig.timezone);

export { IncreaseComsumedElectricNumber }