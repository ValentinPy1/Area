import { Action } from '../action'
import { PrismaService } from 'prisma/prisma.service'

export default class GmailSend implements Action {
    constructor(private prisma: PrismaService) {}

    public async startAction(data : any, userId : string, triggerResult : any) : Promise<void> {
        try {
            var access_token = null;
            const subject = data['subject']
            var body = data['body']
            const recipient = data['recipient']
            const oauth2dt = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
            if (!oauth2dt) {
                console.log('No oauth2 data found for Google')
                return
            }
            access_token = oauth2dt['data']['accessToken']
            const rawMessage = `To: ${recipient}\nSubject: ${subject}\n\n${body}`
            const messageData = {raw: Buffer.from(rawMessage).toString('base64')}
            const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            })
            if (response.status === 200)
                console.log('Email sent successfully!')
            else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
}