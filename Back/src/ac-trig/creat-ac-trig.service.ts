import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { async } from 'rxjs';

@Injectable()
export class CreatAcTrigService {
    constructor(private prisma: PrismaService) {}
    
    async newAction(dto, req) {
        const {name, servicename, func, description, toSend} = dto
        const existe = await this.prisma.actionsAvailable.findUnique({where : {name : name}})
        if (existe) {
            throw new BadRequestException("Action already exists!")
        }
        const naction = await this.prisma.actionsAvailable.create({
            data : {
                name : name,
                serviceName : servicename,
                func : func,
                description : description,
                toSend : toSend
            }
        })
        return {'actionId' : naction.id}
    }

    async newTrigger(dto, req) {
        const {name, servicename, func, description, toSend} = dto
        const existe = await this.prisma.triggersAvailable.findUnique({where : {name : name}})
        if (existe) {
            throw new BadRequestException("Trigger already exists!")
        }
        const ntrigger = await this.prisma.triggersAvailable.create({
            data : {
                name : name,
                serviceName : servicename,
                func : func,
                description : description,
                toSend : toSend
            }
        })
        return {'triggerId' : ntrigger.id}
    }

    async getActions(req) {
        const actions = await this.prisma.actionsAvailable.findMany()
        return actions
    }

    async getTriggers(req) {
        const triggers = await this.prisma.triggersAvailable.findMany()
        return triggers
    }

    async addService(dto, req) {
        const {name, description, color, logo, oauth2url} = dto
        const existe = await this.prisma.services.findUnique({where : {name : name}})
        if (existe) {
            throw new BadRequestException("Service already exists!")
        }
        const nservice = await this.prisma.services.create({
            data : {
                name : name,
                description : description,
                logo : logo,
                color : color,
                oauth2url : oauth2url
            }
        })
        return {'serviceId' : nservice.id}
    }

    async getServices(req) {
        const services = await this.prisma.services.findMany()
        return services
    }

    async sendBackdata(data, name, userid) {
        try {
            const rtn = data['return']
            const choices = data['choices']
            if (choices.length != 0) {
                return data
            }
            const service = await this.prisma.oauth2Data.findFirst({where : {serviceName : name, userId : userid}})
            if (service == null) {
                return data
            }
            data['choices'] = service['data'][rtn]
            return data
        } catch (error) {
            return data
        }
    }

    async loopSendBackdata(data, userid) {
        for (const task of data) {
            try {
                const toSend = task['toSend']
                for (const [key] of Object.entries(task['toSend'])) {
                    const key2 = Object.keys(toSend[key])[0]
                    task['toSend'][key][key2] = await this.sendBackdata(toSend[key][key2], task['serviceName'], userid)
                }
            } catch {}
           
        }
        return data
    }

    async getActionOfService(name, req : Request) {
        const userid = req['user']['id']
        const service = await this.prisma.services.findUnique({where : {name : name}})
        if (!service) {
            throw new BadRequestException("Wrong service name!")
        }
        const action = await this.prisma.actionsAvailable.findMany({where : {serviceName : name}})
        if (action == null) {
            return []
        }
        return await this.loopSendBackdata(action, userid)
    }

    async getTriggerOfService(name, req : Request) {
        const userid = req['user']['id']
        const service = await this.prisma.services.findUnique({where : {name : name}})
        if (!service) {
            throw new BadRequestException("Wrong service name!")
        }
        const trigger = await this.prisma.triggersAvailable.findMany({where : {serviceName : name}})
        if (trigger == null)
            return []
        return await this.loopSendBackdata(trigger, userid)
    }

    async deleteAll(req) {
        await this.prisma.actionsAvailable.deleteMany()
        await this.prisma.triggersAvailable.deleteMany()
        await this.prisma.services.deleteMany()
        return "Deleted all!"
    }
}
