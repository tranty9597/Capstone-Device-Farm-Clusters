import "babel-polyfill"
import { Router } from 'express'
import { Clock, SystemTemperature } from '../models';
import { ClockData } from "../cronJob/Data";

const InfoRequestRoute = Router()

InfoRequestRoute.get('/getInfoByAll', async (req, res) => {

    try {
        const infos = await Promise.all(
            ClockData.map(({ id }) => Clock.getInfoById(id))
        )
        const temperature = await new SystemTemperature().getTemperature()

        res.status(200).json({
            isSucess: true,
            message: "Get info success",
            data: {
                infos,
                temperature
            }
        })
    } catch (error) {
        res.status(500).json({
            isSucess: false,
            message: error.message
        })
    }
})

InfoRequestRoute.get('/getInfoByOne', async (req, res) => {
    const { id } = req.query
    try {
        const info = await Clock.getInfoById(id)
        const temperature = await new SystemTemperature().getTemperature()
        res.status(200).json({
            isSucess: true,
            message: "Get info success",
            data: {
                info,
                temperature
            }
        })
    } catch (error) {
        res.status(500).json({
            isSucess: false,
            message: error.message
        })
    }
})

InfoRequestRoute.post('/getInfoByMany', async (req, res) => {
    const { clocks } = req.body

    try {
        let infos = await Promise.all(
            clocks.map(id => Clock.getInfoById(id))
        )
        const temperature = await new SystemTemperature().getTemperature()
        res.status(200).json({
            isSucess: true,
            message: "Get info success",
            data: {
                infos,
                temperature
            }
        })
    } catch (error) {
        res.status(500).json({
            isSucess: false,
            message: error.message
        })
    }
})

export { InfoRequestRoute }