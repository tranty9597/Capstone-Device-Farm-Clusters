import "babel-polyfill"
import { FirDatabase } from "../instances";
import { TemperatureProvider } from "../providers";

export class SystemTemperature {

    constructor() {
        this.refTemperature = FirDatabase.ref("Temperature")
        this.refValue = FirDatabase.ref("Temperature/value")
        this.refUpdatedAt = FirDatabase.ref("Temperature/updatedAt")
    }

    getTemperature() {
        return new Promise((res, rej) => {
            this.refTemperature.once("value", snapshot => {
                res(snapshot.val())
            }).catch(err => {
                rej(new Error("Can not get system temperature"))
            })
        })

    }

    updateSystemTemperature(temperature = TemperatureProvider()) {
     
        if (typeof temperature === "undefined") {
            temperature = 20
        }
        this.refTemperature.set({
            updatedAt: new Date().getTime(),
            value: temperature
        })
    }
}
