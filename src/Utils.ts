﻿export namespace Utils {
    export function hexToDecimal(hex: string) {
        return parseInt(hex.replace("#",""), 16)
    }
}