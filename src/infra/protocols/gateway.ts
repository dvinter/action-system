export interface GatewayProtocol {
  open(params: string): Promise<any>;
  close?(): Promise<any>;
}
