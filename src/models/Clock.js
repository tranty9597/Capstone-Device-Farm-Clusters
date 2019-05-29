import "babel-polyfill"
import { FirDatabase } from "../instances";
import { CapacityProvider } from "../providers";
import { ClockData } from "../cronJob/Data";

export class Clock {

    constructor(clock) {
        this.id = clock.id
        this.type = clock.type
        this.updateClock.bind(this)
        this.refNumber = FirDatabase.ref(`ClockDev/${this.id}/number`)
        this.refTimeStamp = FirDatabase.ref(`ClockDev/${this.id}/timeUpdated`)
        this.refStatus = FirDatabase.ref(`ClockDev/${this.id}/status`)
        this.refID = FirDatabase.ref(`ClockDev/${this.id}/id`)
        this.refClock = FirDatabase.ref(`ClockDev/${this.id}`)

        this.refID.set(this.id)
    }

    static initWithId(id) {
        let clock = ClockData.find(x => x.id === Number(id));
        return new Clock(clock)
    }

    static async getInfoById(id) {

        const clock = Clock.initWithId(id);

        return await clock.getInfo()
    }

    updateClock(temperature) {
        const capacity = CapacityProvider(this.type, temperature);

        this.refNumber.once("value", snapshot => {
            const oldNumber = snapshot.val();

            const next = capacity / 60 * 0.001

            const newNumber = next + oldNumber;

            // console.log(`Clock ${this.type} with id ${this.id} at ${new Date().getHours()} ===`, next)

            this.refNumber.set(newNumber)
            this.refTimeStamp.set(new Date().getTime())
        })
    }

    getStatus() {
        return new Promise((res, rej) => {
            this.refStatus.once("value", snapshot => {
                res(snapshot.val())
            }).catch(err => {
                rej(new Error("Can not get clock's status"))
            })
        })
    }

    getNumber() {
        return new Promise((res, rej) => {
            this.refNumber.once("value", snapshot => {
                res(snapshot.val())
            }).catch(err => {
                rej(new Error("Can not get clock's number"))
            })
        })
    }

    getInfo() {
        const exception = new Error("Canot get info clock")
        return new Promise(async (res, rej) => {
            try {
                const status = await this.getStatus();
                if (!status || status === 0) {
                    res({
                        isLostConection: true,
                        id: this.id,
                        type: this.type
                    })
                } else {
                    const number = await this.getNumber()
                    const capacity = CapacityProvider(this.type)
                    res({
                        number,
                        capacity,
                        id: this.id,
                        type: this.type
                    })
                }
            } catch (error) {
                rej(exception)
            }

        })
    }
}
