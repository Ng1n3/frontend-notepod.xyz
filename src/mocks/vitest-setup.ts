import "@testing-library/jest-dom"
import {server} from './server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn'}))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())