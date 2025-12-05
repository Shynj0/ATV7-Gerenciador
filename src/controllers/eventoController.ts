import { Request, Response } from "express";
import Evento from "../models/Evento";

//criar, listar, atualizar, excluir

export class EventoController {
    async criar(req: Request, res: Response) {
        try {
            const novoEvento = await Evento.create(req.body);
            res.status(201).json(novoEvento);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao criar", erro: error });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const titulo = req.query.titulo as string;
            const filtro = titulo ? { titulo: { $regex: titulo, $options: 'i' } } : {};

            const eventos = await Evento.find(filtro);
            res.json(eventos);

        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar" });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const evento = await Evento.findByIdAndUpdate(id, req.body, { new: true });
            res.json(evento);

        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao atualizar" });

        }
    }


    async excluir(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Evento.findByIdAndDelete(id);
            res.json({ mensagem: "Evento excluído" });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao excluir" });
        }
    }
}

