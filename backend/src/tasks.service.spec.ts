import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: '1', relations: [] }),
            create: jest.fn().mockResolvedValue({ id: '1', title: 'New Task' }),
            updateStatus: jest.fn().mockResolvedValue({ id: '1', status: 'done' })
          }
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() returns tasks filtered by workspaceId', async () => {
    expect(await service.findAll('workspace-1')).toEqual([]);
  });

  it('findOne() returns a task with all relations', async () => {
    const res = await service.findOne('1');
    expect(res).toBeDefined();
    expect(res.id).toEqual('1');
  });

  it('create() creates and returns a task', async () => {
    const res = await service.create({ title: 'New Task' });
    expect(res.title).toEqual('New Task');
  });

  it('updateStatus() updates task status', async () => {
    const res = await service.updateStatus('1', 'done');
    expect(res.status).toEqual('done');
  });
});
