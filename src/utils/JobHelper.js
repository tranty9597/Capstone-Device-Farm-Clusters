import { ElecCapacity } from "../configs";

function getTemperatureType(temperature) {
    if (temperature > 10 && temperature < 20) {
        return "tempType1"
    } else if (temperature < 30) {
        return "tempType2"
    } else {
        return "tempType3"
    }
}

function getTimeType() {
    const time = new Date().getHours()

    const nodes = [0, 4, 9.5, 11.5, 17, 20, 22, 24]

    let afterIndex = nodes.findIndex(x => x > time);
    return `${nodes[afterIndex - 1]}`
}


export function getCapacityRange(type, temperature) {

    const isSunday = new Date().getDay() === 7

    const dayNode = isSunday ? "normalDay" : "sunday"

    return ElecCapacity[type][dayNode][getTemperatureType(temperature)][getTimeType()]
}