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

type TextRange = {
  min: number;
  max: number;
  default: number;
  step: number;
}

export type TextModel = {
  modelName: string;
  modelId: string;
  temperatureRange: TextRange;
  maxTokenRange: TextRange;
}

export type TextPayload = {
  prompt: string;
  temperature: number;
  maxTokens: number;
}

export type NumericInputProps = {
  value: number;
  range: TextRange;
  disabled: boolean;
  callback: (n: number) => void;
  className: string;
}

export type MessageObject = {
  sender: 'Human' | 'Assistant';
  message: string;
}
