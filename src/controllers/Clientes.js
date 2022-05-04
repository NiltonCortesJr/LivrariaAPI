import DBMClientes from "../DAO/DBMClientes.js"
import ClientesModel from "../models/ClientesModel.js"
import Validacoes from "../services/Validacoes.js"

class Clientes{
    static routers(app){
        
        app.get("/clientes", async (req, res) =>{
            const response = await DBMClientes.listarTodos()
            res.status(200).json(response)
        })

        app.get("/clientes/:id", async (req, res) =>{
            const selecionarUm = await DBMClientes.listaPorId(req.body.id)
            res.status(200).json(selecionarUm)
        })

        // app.post("/clientes", async(req, res) => {
        //     try {                
        //         if(Validacoes.validaNome(req.body.nome) && Validacoes.validaCPF(req.body.cpf), Validacoes.validaTelefone(req.body.telefone)){
        //             const cliente = new ClientesModel(...Object.values(req.body))
        //             const response = await DBMClientes.incluir(cliente)
        //             res.status(201).json(response)
        //         } else {
        //             throw new Error("Requisição fora do padrões, favor verificar.")
        //         }
        //     } catch (e) {
        //         res.status(400).json({erro: e.message})
        //     }
        // })

        app.post("/clientes", async(req, res) => {
            try {                
                if(Validacoes.validaNome(req.body.nome)) {
                    if(Validacoes.validaCPF(req.body.cpf)) {
                        if(Validacoes.validaTelefone(req.body.telefone)) {                        
                            const cliente = new ClientesModel(...Object.values(req.body))
                            const response = await DBMClientes.incluir(cliente)
                            res.status(201).json(response)
                        }   
                    }   
                } else {
                    throw new Error("Requisição fora do padrões, favor verificar.")
                }
            } catch (e) {
                res.status(400).json({erro: e.message})
            }
        })

        app.put('/clientes/id', async (req, res)=> {
            const updateCliente = await DBMClientes.atualizaPorId(req.body, req.body.id )
            res.status(200).json(updateCliente);
            });
        
        app.delete('/clientes', async (req, res) => {
            let deleteUma = await DBMClientes.deletaPorId(req.body.id)
            res.status(200).json(deleteUma)
        })
    }
}

export default Clientes