import { Test, TestingModule } from '@nestjs/testing';
import { Utils } from './utils';

describe('Utils', () => {
  let provider: Utils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Utils],
    }).compile();

    provider = module.get<Utils>(Utils);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
