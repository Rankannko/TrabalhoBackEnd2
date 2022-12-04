//Mutation to insert new message, with the paramethers of Mensagem, but the lenght of the field conteudo cannot be higher than 500 characters
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import db from '../db';

const Mutation= {
    inserirUsuario (parent, args, ctx, info){
        const usuario={
            id: uuidv4(),
            nome: args.usuario.nome,
        }
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        ctx.db.usuarios.push(usuario);
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});
        return usuario;
    },
    atualizarUsuario (parent, args, ctx, info){
        const usuario = ctx.db.usuarios.find(u => u.id === args.id);
        const log={
            id: uuidv4(),
            operacao: (info.operation.operation + " - " + info.fieldName),
            date: new Date(),
        }
        if (!usuario)
            throw new Error ("Usuario não existe");
        Object.assign(usuario, {nome: args.usuario.nome||usuario.nome,topico: args.usuario.topico||usuario.topico});
        ctx.db.log.push(log);
        ctx.pubSub.publish('log',{log});
        return usuario;
    },
    inserirMensagem (parent,args,ctx,info){
    const mensagem = {
        id: uuidv4(),
        conteudo: args.mensagem.conteudo,
        autor: args.mensagem.autor,
        topico: args.mensagem.topico,
        date: new Date()
    }

    if(mensagem.conteudo.length>=500){
        throw new GraphQLError('Mensagem muito grande', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
    }
    const log={
        id: uuidv4(),
        operacao: (info.operation.operation + " - " + info.fieldName),
        date: new Date(),
    }
    //var logDB = ctx.db.log;
    ctx.db.log.push(log);
    ctx.db.mensagens.push(mensagem);
    ctx.pubSub.publish('mensagem', args.mensagem.topico,{mensagem});
    ctx.pubSub.publish('log',{log});
    return mensagem
    },
}

export default Mutation