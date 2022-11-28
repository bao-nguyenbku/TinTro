import { Test, TestingModule } from '@nestjs/testing';
import { Accommodation } from './accommodation';

describe('Accommodation', () => {
  let provider: Accommodation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Accommodation],
    }).compile();

    provider = module.get<Accommodation>(Accommodation);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
