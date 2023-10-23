import { Trigger, sleep } from '../trigger'

export default class EtherScanPrice implements Trigger {
    public isTriggered : boolean = false
    private data : any = {}
    private api_key
    public result = []
    constructor(data : any) {
        this.api_key = process.env.ETHERSCAN_API_KEY
        this.data = data;
        this.loop()
    }

    private async loop(): Promise<void> {
        while (true) {
            const res = await fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + this.api_key)
            if (res.status !== 200) {
                continue
            }
            const resjson = await res.json()
            if (this.data['value'] == '>' && resjson.result['ethusd'] > this.data['ethPrice'])
                this.isTriggered = true;
            else if (this.data['value'] == '<' && resjson.result['ethusd'] < this.data['ethPrice'])
                this.isTriggered = true;
            else if (this.data['value'] == '=' && resjson.result['ethusd'] == this.data['ethPrice'])
                this.isTriggered = true;
            if (this.isTriggered) {
                this.result.push(this.data['ethPrice'])
            }
            await sleep(this.data['time'] * 10000)
        }
    }

    public async isTrigger(): Promise<any[]> {
        return this.result;
    }

    public resetTrigger(): void {
        this.result = [];
        this.isTriggered = false;
        return;
    }
}