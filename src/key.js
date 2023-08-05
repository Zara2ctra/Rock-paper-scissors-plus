import crypto from "node:crypto";

export class Key {
    constructor(computerMove) {
        this.computerMove = computerMove;
        this.secretKey = crypto.randomBytes(32).toString("hex").toUpperCase();
        this.hmac = this.generateHmac(this.computerMove).toUpperCase();
    }

    generateHmac(message) {
        const hmac = crypto.createHmac('sha256', this.secretKey);
        hmac.update(message);
        return hmac.digest('hex')
    }
}