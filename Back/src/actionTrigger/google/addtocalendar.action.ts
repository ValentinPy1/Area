import { Action } from '../action'
import { PrismaService } from 'prisma/prisma.service'
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export default class GmailSend implements Action {
    constructor(private prisma: PrismaService) {}

    public async startAction(data : any, userId : string, triggerResult : any) : Promise<void> {
        try {
            var access_token = null;
            var body = data['body']
            const oauth2dt = await this.prisma.oauth2Data.findFirst({where : {serviceName : 'Google', userId : userId}})
            if (!oauth2dt) {
                console.log('No oauth2 data found for Google')
                return
            }
            access_token = oauth2dt['data']['accessToken']
            const oAuth2Client = new google.auth.OAuth2();
            oAuth2Client.setCredentials({ access_token: access_token });
            const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
            const startDate = data['startDate']
            const startHour = data['startHour']
            const endDate = data['endDate']
            const endHour = data['endHour']
            const event = {
                summary: body,
                start: {
                    //'2023-10-20T12:00:00'
                    dateTime: startDate + 'T' + startHour + ':00',
                    timeZone: 'Europe/Madrid',
                },
                end: {
                    dateTime: endDate + 'T' + endHour + ':00',
                    timeZone: 'Europe/Madrid',
                },
            };

            try {
                const response = await calendar.events.insert({
                  calendarId: 'primary',
                  requestBody: event,
                });
            
              } catch (error) {
                console.error('Error creating event:', error);
              }

        } catch (error) {
            console.log(error)
        }
    }
}