import { v4 as uuidv4 } from 'uuid';
import { useErrorHandler } from "@graphql-yoga/node";

const Query ={
    usuarios(parent,args,ctx,info){
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});
        
        return ctx.db.usuarios
    },
    topicos(parent,args,ctx,info){
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});

        return ctx.db.topicos
    },
    mensagens(parent,args,ctx,info){
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});

        return ctx.db.mensagens
    },
    historico(parent,args,ctx,info){
        const historico = ctx.db.mensagens.filter(topic => topic.topico == args.topico);
        historico.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        });
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});

        return historico
    },
    consultarLogQuery(parent, args, ctx, info){
        if (args.acessar.idAdmin !== "admin" || args.acessar.senhaAdmin !== "admin"){
            throw new GraphQLError ("Acesso negado");
        }
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});

        return ctx.db.log
    }
}

export default Query