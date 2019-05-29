import { randomInRange } from "./MathProvider";

export function TemperatureProvider() {
    const time = new Date().getHours();

    if (time >= 0 && time < 8) {
        return randomInRange(10, 20)
    } else if (time < 10) {
        return randomInRange(20, 28)
    } else if (time < 17) {
        randomInRange(25, 40)
    } else if (time <= 23) {
        return randomInRange(20, 28)
    } else {
        return randomInRange(15, 25)
    }
}