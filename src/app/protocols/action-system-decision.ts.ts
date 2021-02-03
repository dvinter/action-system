import { AllAnalyzesProtocol } from './all-analyzes';

type DecisionsTypes = 'block' | 'mute' | 'pushNotification';

export interface ActionSystemDecisionsProtocol {
  actions: DecisionsTypes[];
  analyzes: AllAnalyzesProtocol;
}
