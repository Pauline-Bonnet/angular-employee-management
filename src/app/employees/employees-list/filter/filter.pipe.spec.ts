import { ListComponent } from './../list/list.component';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let component: ListComponent;
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe(component);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});