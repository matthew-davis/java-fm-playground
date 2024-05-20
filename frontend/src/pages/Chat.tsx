import React, { useState } from "react";
import { GlobalConfig } from "../app.config";
import { MessageObject } from "../types/types";

function Chat() {
  const [conversation, setConversation] = useState<MessageObject[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const endpoint = "/foundation-models/model/chat/anthropic.claude-v2/invoke";
  const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const extractPrompt = (body: MessageObject[]) => {
    let conversationBuilder = '';
    for (const message of body) {
      conversationBuilder += `${message.sender}: ${message.message}\n\n`;
    }

    return conversationBuilder.trim();
  }

  const sendMessage = async () => {
    const newMessage: MessageObject = { sender: "Human", message: inputValue };
    setConversation(prevConversation => [...prevConversation, newMessage]);
    setInputValue('');

    try {
      const message = extractPrompt([...conversation, newMessage]);

      setIsLoading(true);

      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json().then(data => {
        setConversation(prevConversation => [...prevConversation, {
          sender: "Assistant",
          message: data.completion
        }]);
      });

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col flex-auto h-full p-6">
      <h3 className="text-3xl font-medium text-gray-700">Chat Playground</h3>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
        <div className="w-64 mb-4">
          <div id="dropdown-button"
               className="inline-flex justify-left w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
            <span className="mr-auto">Model: Anthropic Claude 2</span>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {conversation.map((item, i) => item.sender === "Assistant" ? (
                <div key={i} className="col-start-1 col-end-11 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl rounded-br-xl">
                      <div>{item.message}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="col-start-3 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      H
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{item.message}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading ? (
                <div className="col-start-1 col-end-11 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-3 px-4 shadow rounded-xl rounded-br-xl">
                      <div role="status">
                        <div className="bouncing-loader">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div className="flex-grow">
            <div className="relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage();
                  }
                }}
                placeholder="Send a message"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              type="button"
              onClick={sendMessage}
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
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
  );
}

export default Chat;
