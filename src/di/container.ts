import { IDepartureRepository } from '../domain/repositories/IDepartureRepository';
import { MockDepartureRepository } from '../infrastructure/MockDepartureRepository';
import { GetDeparturesUseCase } from '../use-cases/GetDeparturesUseCase';

// Composition root: the only place that knows which concrete classes are used.
// Lazy getters create each object on first use and then reuse it.
class Container {
  private departureRepositoryInstance?: IDepartureRepository;
  private getDeparturesUseCaseInstance?: GetDeparturesUseCase;

  get departureRepository(): IDepartureRepository {
    this.departureRepositoryInstance ??= new MockDepartureRepository();
    return this.departureRepositoryInstance;
  }

  get getDeparturesUseCase(): GetDeparturesUseCase {
    this.getDeparturesUseCaseInstance ??= new GetDeparturesUseCase(this.departureRepository);
    return this.getDeparturesUseCaseInstance;
  }
}

export const container = new Container();
