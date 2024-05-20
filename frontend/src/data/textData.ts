import { TextModel, TextPayload } from "../types/types";

export const defaultModel: TextModel = {
  modelName: "Anthropic Claude 2",
  modelId: "anthropic.claude-v2",
  temperatureRange: {
    min: 0,
    max: 1,
    default: 0.5,
    step: 0.1,
  },
  maxTokenRange: {
    min: 0,
    max: 4096,
    default: 200,
    step: 1,
  }
}

export const models: TextModel[] = [
  defaultModel,
  {
    modelName: "Anthropic Claude Instant 1.2",
    modelId: "anthropic.claude-instant-v1",
    temperatureRange: {
      min: 0,
      max: 1,
      default: 0.5,
      step: 0.1,
    },
    maxTokenRange: {
      min: 0,
      max: 4096,
      default: 200,
      step: 1,
    }
  },
  {
    modelName: "Anthropic Claude 2.1",
    modelId: "anthropic.claude-v2:1",
    temperatureRange: {
      min: 0,
      max: 1,
      default: 0.5,
      step: 0.1,
    },
    maxTokenRange: {
      min: 0,
      max: 4096,
      default: 200,
      step: 1,
    }
  },
  {
    modelName: "AI21 Labs Jurassic-2",
    modelId: "ai21.j2-mid-v1",
    temperatureRange: {
      min: 0,
      max: 1,
      default: 0.5,
      step: 0.1,
    },
    maxTokenRange: {
      min: 0,
      max: 8191,
      default: 200,
      step: 1,
    }
  }
]

export const defaultPayload: TextPayload = {
  prompt: "",
  temperature: defaultModel.temperatureRange.default,
  maxTokens: defaultModel.maxTokenRange.default
}
