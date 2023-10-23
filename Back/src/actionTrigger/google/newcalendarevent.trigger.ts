import { Trigger, sleep } from '../trigger'
import { PrismaService } from 'prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { google, calendar_v3 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { TriggerActionService } from '../actiontrigger.service';


export default class PinNewEvent implements Trigger {
    public result: any[] = []
    public id;
    private myCalendar =  new Map()
    private data = null
    constructor(data: any, userId : string, private prisma: PrismaService, private triggeractionserv: TriggerActionService) {
        this.id = uuidv4();
        this.data = data
        this.init(userId)
    }

    private async loop(calendar : any): Promise<void> {
        await sleep(1000)
        while (true) {
            const r = ['\n']
            const events = await calendar.events.list({
                calendarId: 'primary',
            })
            events.data.items.forEach(element => {
                if (!this.myCalendar.has(element['id'])) {
                    this.myCalendar.set(element['id'], element['summary'])
                    r[0] = r[0] + '-Event: ' + element['summary'] + '\n'
                }
            })
            if (r[0] != '\n')
               this.result = r
            await sleep(this.data['time'] * 10000)
        }
    }

    private async init(userId : string): Promise<void> {
        const oauth2dt = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
        if (!oauth2dt) {
            return;
        }
        const accessToken = oauth2dt['data']['accessToken']
        const oAuth2Client = new google.auth.OAuth2({
            clientId: process.env.GOOGLE_CLIENT_SECRET,
            clientSecret: process.env.GOOGLE_CLIENT_ID,
            redirectUri: 'http://localhost:8080/oauth2/google/callback',
        });

        oAuth2Client.setCredentials({ access_token: accessToken })
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
        
        try {
            const events = await calendar.events.list({
                calendarId: 'primary',
            })
            events.data.items.forEach(element => {
                this.myCalendar.set(element['id'], element['summary'])
            })
            this.loop(calendar)
        } catch (error) {
            console.log(error)
        }
    }

    public async isTrigger(): Promise<any[]> {
        return this.result
    }

    public resetTrigger(): void {
        this.result = []
    }
}