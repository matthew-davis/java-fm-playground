export type ErrorMessage = {
  errorMsg?: string;
}

export type ModelResponse = {
  modelId: string;
  providerName: string;
  modelName: string;
  customizationsSupported?: string;
  outputModalities?: string;
  modelArn?: string;
}

export type ModelCacheStatus = {
  status: 'NEW' | 'RESOLVED';
  data: ModelResponse | ModelResponse[];
}
