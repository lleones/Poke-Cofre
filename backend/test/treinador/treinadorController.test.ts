import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { SinonStub, SinonSpy } from 'sinon';
import { Request, Response } from 'express';

import { TreinadorController } from '../../src/controllers/treinador.controller';
import { TreinadorService } from '../../src/services/treinador.service';
import Treinador, { TreinadorAttributes } from '../../src/models/treinador.model';

// Define um tipo para nosso mock do Response, com os spies/stubs
type MockResponse = Partial<Response> & {
  json: SinonSpy;
  status: SinonStub;
};

describe('TreinadorController', () => {
  
  describe('getAll', () => {
    it('Deve retornar a lista de treinadores via res.json', async () => {
      // Criando instâncias do model usando build()
      const treinador1 = Treinador.build({ id: '1', nome: 'Ash' });
      const treinador2 = Treinador.build({ id: '2', nome: 'Misty' });
      const mockTreinadores: Treinador[] = [treinador1, treinador2];

      // Stub para o service
      const stub = sinon.stub(TreinadorService, 'getAllTreinadores').resolves(mockTreinadores);

      // Mocks dos objetos Request e Response
      const req = {} as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.getAll(req, res as Response);

      // Verifica se res.json foi chamado com os treinadores mockados
      expect(res.json.calledWith(mockTreinadores)).to.be.true;

      stub.restore();
    });
  });

  describe('getById', () => {
    it('Deve retornar o treinador encontrado via res.json', async () => {
      const treinador: Treinador = Treinador.build({ id: '1', nome: 'Ash' });
      const stub = sinon.stub(TreinadorService, 'getTreinadorById').resolves(treinador);

      // Criando um req com params
      const req = { params: { id: '1' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.getById(req, res as Response);

      expect(res.json.calledWith(treinador)).to.be.true;
      stub.restore();
    });

    it('Deve retornar 404 se treinador não for encontrado', async () => {
      const stub = sinon.stub(TreinadorService, 'getTreinadorById').resolves(null);

      const req = { params: { id: 'nao-existe' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.getById(req, res as Response);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: 'Treinador não encontrado' })).to.be.true;
      stub.restore();
    });
  });

  describe('create', () => {
    it('Deve criar um treinador e retornar status 201', async () => {
      const treinadorData: TreinadorAttributes = { id: '1', nome: 'Ash' };
      const treinadorCriado = Treinador.build(treinadorData);

      const stub = sinon.stub(TreinadorService, 'createTreinador').resolves(treinadorCriado);

      const req = { body: treinadorData } as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.create(req, res as Response);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(treinadorCriado)).to.be.true;
      stub.restore();
    });
  });

  describe('update', () => {
    it('Deve atualizar e retornar o treinador atualizado via res.json', async () => {
      const treinadorData: TreinadorAttributes = { id: '1', nome: 'Ash Updated' };
      const treinadorAtualizado = Treinador.build(treinadorData);

      const stub = sinon.stub(TreinadorService, 'updateTreinador').resolves(treinadorAtualizado);

      const req = { params: { id: '1' }, body: { nome: 'Ash Updated' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.update(req, res as Response);

      expect(res.json.calledWith(treinadorAtualizado)).to.be.true;
      stub.restore();
    });

    it('Deve retornar 404 se o treinador não for encontrado ao atualizar', async () => {
      const stub = sinon.stub(TreinadorService, 'updateTreinador').resolves(null);

      const req = { params: { id: 'nao-existe' }, body: { nome: 'Nome' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.update(req, res as Response);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: 'Treinador não encontrado' })).to.be.true;
      stub.restore();
    });
  });

  describe('deleteTreinador', () => {
    it('Deve deletar o treinador e retornar status 204', async () => {
      // Aqui o service retorna true se a deleção ocorreu
      const stub = sinon.stub(TreinadorService, 'deleteTreinador').resolves(true);

      const req = { params: { id: '1' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy(), // para o send() do res
      };

      await TreinadorController.deleteTreinador(req, res as Response);

      expect(res.status.calledWith(204)).to.be.true;
      // Para status 204, normalmente não há corpo, portanto pode ser apenas send() sem argumentos
      expect((res.send as SinonSpy).calledOnce).to.be.true;
      stub.restore();
    });

    it('Deve retornar 404 se o treinador não for encontrado ao deletar', async () => {
      const stub = sinon.stub(TreinadorService, 'deleteTreinador').resolves(false);

      const req = { params: { id: 'nao-existe' } } as unknown as Request;
      const res: MockResponse = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      await TreinadorController.deleteTreinador(req, res as Response);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: 'Treinador não encontrado' })).to.be.true;
      stub.restore();
    });
  });
});
