import { randomInRange } from "./MathProvider";
import { getCapacityRange } from "../utils";


export function CapacityProvider(type, temperature) {

    const { min, max } = getCapacityRange(type, temperature)

    return randomInRange(min, max )
}