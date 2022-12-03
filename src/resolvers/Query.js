const Query ={
    usuarios(parent,args,ctx,info){
        const log={
            operacao: "Query - usuarios",
            autor: "11",
            date: new Date(),
        }
        ctx.db.log.push(log);
        return ctx.db.usuarios
    },
    topicos(parent,args,ctx,info){
        const log={
            operacao: "Query - topicos",
            autor: "11",
            date: new Date(),
        }
        ctx.db.log.push(log);
        return ctx.db.topicos
    },
    mensagens(parent,args,ctx,info){
        const log={
            operacao: "Query - mensagens",
            autor: "11",
            date: new Date(),
        }
        ctx.db.log.push(log);
        return ctx.db.mensagens
    },
    historico(parent,args,ctx,info){
        const historico = ctx.db.mensagens
        historico.sort((a,b)=>{
            const nameA = a.date.toUpperCase()
            const nameB = b.date.toUpperCase()
            if(nameA < nameB){
                return -1
            }
            if(nameA > nameB){
                return 1
            }
            return 0;
        });
        const log={
            operacao: "Query - historico",
            autor: "11",
            date: new Date(),
        }
        ctx.db.log.push(log);
        return historico
    },
    totaisPorCategoria(parent,args,ctx,info){
        let totais = ctx.db.topicos.map(topico=>{
            return{
                id: topico.id,
                nome: topico.nome,
                total: topico.usuarios.length
            }
        })
        //let totais = ctx.db.topicos.map(topico=>{
        //    return {
        //        nome: topico.nome,
        //        total: parent.usuarios.length
        //    }
       // })
       const log={
        operacao: "Query - totaisPorCategoria",
        autor: "11",
        date: new Date(),
        }
        ctx.db.log.push(log);
        return totais
    },
}

export default Query