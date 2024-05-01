import { describe, expect, it } from 'bun:test'
import app from '../index.js'


describe('Aplikasi', () => {
    it('Ping App', async () => {
        await app.modules
        const res = await app
            .handle(new Request('http://localhost/ping'))
            .then((r) => r.text())
        expect(res).toBe('pong')
    })

    it('Get Annual Sales', async () => {
        await app.modules
        const res = await app
            .handle(new Request('http://localhost/annual-sales'))
            .then((r) => r.json())
        expect(res).toEqual(expect.any(Array))
    })

    it('Get Monthly Sales for a specific year', async () => {
        await app.modules
        const year = 2022; // Ganti dengan tahun yang valid
        const res = await app
            .handle(new Request(`http://localhost/monthly-sales/${year}`))
            .then((r) => r.json())
        expect(res).toEqual(expect.any(Array))
    })
})