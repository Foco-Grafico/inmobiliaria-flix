import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";


describe("API Endpoints testing functionality", () => {
    class CustomFormdata extends FormData {
        constructor() {
            super()
        }

        setVal(key: string, value: string) {
            this.set(
                key,
                value
            )

            return this
        }
    }

    const URL = "http://localhost:3000";

    const parseUrl = (pathname: string) => {
        return `${URL}${pathname}`;
    }

    const genRandomUser = () => {
        const generateRandomPhoneNumber = () => {
            return `+52${Math.floor(Math.random() * 1000000000)}`
        }

        return {
            email: `${randomUUID()}@example.com`,
            password: randomUUID(),
            first_name: randomUUID(),
            last_name: randomUUID(),
            phone_number: generateRandomPhoneNumber()
        }
    }

    const randomUser = genRandomUser();

    test("GET /api/health", async () => {
        const response = await fetch(parseUrl("/api/health"));

        expect(response.status).toBe(200);
        expect(await response.text()).toBe('"OK"');
    })

    let token = ''

    test('REGISTER /api/auth/register', async () => {
        const data = new CustomFormdata()
            .setVal('email', randomUser.email)
            .setVal('password', randomUser.password)
            .setVal('first_name', randomUser.first_name)
            .setVal('last_name', randomUser.last_name)
            .setVal('phone_number', randomUser.phone_number)

        const res = await fetch(parseUrl('/api/auth/register'), {
            method: 'POST',
            body: data
        })

        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.token).toBeDefined()
    })

    test("LOGIN /api/auth/login with email", async () => {
        const data = new CustomFormdata()
            .setVal('email', randomUser.email)
            .setVal('password', randomUser.password)

        const res = await fetch(parseUrl('/api/auth/login'), {
            method: 'POST',
            body: data
        })

        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.token).toBeDefined()
    })
})