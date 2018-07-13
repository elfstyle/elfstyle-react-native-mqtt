import store from '../store'
import { CONSOLE_ADD_RECORD } from '../types'

export function consoleAddRecord(record) {
    return {
        type: CONSOLE_ADD_RECORD,
        payload: record
    }
}
