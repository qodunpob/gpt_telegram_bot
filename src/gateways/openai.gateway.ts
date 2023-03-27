export interface OpenaiGateway {
  completion(prompt: string): Promise<string>;
}