import { makeAutoObservable } from 'mobx';
import { diagrams } from '../../mock';
import Diagram from '../../models/Diagram';

class DiagramStore {
  private _diagrams: Diagram[] = diagrams;

  private _diagram: Diagram | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setDiagrams(diagrams: Diagram[]) {
    this._diagrams = diagrams;
  }

  setDiagram(diagram?: Diagram) {
    this._diagram = diagram;
  }

  get diagrams() {
    return this._diagrams;
  }

  get diagram() {
    return this._diagram;
  }
}

export default new DiagramStore();
