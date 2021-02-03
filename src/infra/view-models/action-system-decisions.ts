import { AllAnalyzesProtocol } from '@/app/protocols/all-analyzes';

type DecisionsTypes = 'block' | 'mute';

export interface ActionSystemDecisionsViewModel {
  actions?: DecisionsTypes[];
  analyzes: AllAnalyzesProtocol;
}
