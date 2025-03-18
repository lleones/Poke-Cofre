import { expect } from 'chai';
import sinon from 'sinon';
import { TreinadorController } from '../../src/controllers/treinador.controller';
import { TreinadorService } from '../../src/services/treinador.service';
import Treinador from '../../src/models/treinador.model';

describe('TreinadorController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {};
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getAll deve retornar uma lista de treinadores', async () => {
    const fakeTreinadores = [{
      id: '1',
      nome: 'Bill',
      senha: 'dummy'
    }] as unknown as Treinador[];
    
    sinon.stub(TreinadorService, 'getAllTreinadores').resolves(fakeTreinadores);
    await TreinadorController.getAll(req, res);
    expect(res.json.calledWith(fakeTreinadores)).to.be.true;
  });

  it('getById deve retornar 404 se o treinador não for encontrado', async () => {
    req.params = { id: '123' };
    sinon.stub(TreinadorService, 'getTreinadorById').resolves(null);
    await TreinadorController.getById(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: 'Treinador não encontrado' })).to.be.true;
  });
});
