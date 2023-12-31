import { Module } from '@nestjs/common';
import { Oauth2Service } from './oauth2.service';
import { Oauth2Controller } from './oauth2.controller';
import { DiscordBot }  from '../actionTrigger/discord/discordBot'

@Module({
  controllers: [Oauth2Controller],
  providers: [Oauth2Service],
})
export class Oauth2Module { constructor() {}}
