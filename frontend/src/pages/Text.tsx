import React, { useState } from "react";
import { GlobalConfig } from "../app.config";
import NumericInput from "../components/NumericInput";
import { defaultModel, defaultPayload, models } from "../data/textData";
import { TextModel, TextPayload } from "../types/types";

function Text() {
  const [currentModel, setCurrentModel] = useState(defaultModel);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState(defaultPayload);

  const selectModel = () => {
    const selectedModelId = (document.getElementById("model-select") as HTMLInputElement).value;
    const selectedModel = models.filter(model => { return model.modelId = selectedModelId})[0];
    onModelChange(selectedModel);
  };

  const onModelChange = (newModel: TextModel) => {
    setCurrentModel(newModel);
    setPrompt("");
    setTemperature(newModel.temperatureRange.default);
    setMaxTokens(newModel.maxTokenRange.default);
  }

  const setPrompt = (newPrompt: string) => setPayload(
    (prevPayload: TextPayload) => ({ ...prevPayload, prompt: newPrompt })
  );
  const setTemperature = (newTemperature: number) => setPayload(
    (prevPayload: TextPayload) => ({ ...prevPayload, temperature: newTemperature })
  );
  const setMaxTokens = (newMaxTokens: number) => setPayload(
    (prevPayload: TextPayload) => ({ ...prevPayload, maxTokens: newMaxTokens })
  );

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value);
  const handleTemperatureChange = (value: number) => setTemperature(value);
  const handleMaxTokensChange = (value: number) => setMaxTokens(value);

  const sendMessage = async () => {
    if (payload.prompt === null || payload.prompt === undefined || payload.prompt.trim() === "") { return; }

    setIsLoading(true);

    const endpoint = `/foundation-models/model/text/${currentModel.modelId}/invoke`;
    const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

    try {
      const body = JSON.stringify({
        prompt: payload.prompt,
        temperature: payload.temperature,
        maxTokens: payload.maxTokens,
      });

      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json().then(data => {
        if (currentModel.modelId === "anthropic.claude-v2") {
          setPrompt(`Human: ${payload.prompt}\n\nAssistant: ${data.completion}\n\nHuman: `)
        } else {
          setPrompt(`${payload.prompt}\n\n${data.completion}\n\n`)
        }
      });

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col flex-auto h-full p-6">
      <h3 className="text-3xl font-medium text-gray-700">Text Playground</h3>
      <div className="flex flex-col flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
        <select
          className="w-64 mb-4 inline-flex justify-left px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          id="model-select"
          onChange={() => selectModel()}
        >
          {models.map((item, index) => (
            <option key={index} value={item.modelId}>{item.modelName}</option>
          ))}
        </select>
        <textarea
          className="block p-4 mb-4 w-full text-sm text-gray-800 bg-white rounded-md"
          disabled={isLoading}
          onChange={handlePromptChange}
          placeholder="Write something..."
          required
          rows={20}
          value={payload.prompt}
        />

        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <span>Temperature:</span>
            <NumericInput
              callback={handleTemperatureChange}
              className="relative w-20 ml-4"
              disabled={isLoading}
              range={currentModel.temperatureRange}
              value={payload.temperature}
            />
            <span className="ml-8">Max. length:</span>
            <NumericInput
              callback={handleMaxTokensChange}
              className="relative w-20 ml-4"
              disabled={isLoading}
              range={currentModel.maxTokenRange}
              value={payload.maxTokens}
            />
            <div className="ml-auto">
              <button
                className={`flex w-[100px] items-center justify-center rounded-xl text-white px-3 py-2 flex-shrink-0 ${isLoading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                disabled={isLoading}
                onClick={sendMessage}
                type="button"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Text;
