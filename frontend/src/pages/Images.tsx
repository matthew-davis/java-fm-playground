import React, { useState } from 'react';
import { GlobalConfig } from "../app.config";

const styles = [
  "no style",
  "3d-model",
  "analog-film",
  "anime",
  "cinematic",
  "comic-book",
  "digital-art",
  "enhance",
  "fantasy-art",
  "isometric",
  "line-art",
  "low-poly",
  "modeling-compound",
  "neon-punk",
  "origami",
  "photographic",
  "pixel-art",
  "tile-texture"
];

function Images() {
  const [imgSrc, setImgSrc] = useState('/placeholder.png');
  const [inputValue, setInputValue] = useState('');
  const [stylePreset, setStylePreset] = useState('no style');
  const [isLoading, setIsLoading] = useState(false);

  const endpoint = "/foundation-models/model/image/stability.stable-diffusion-xl-v1/invoke";
  const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

  const selectStyle = () => {
    const selectedStyle = (document.getElementById("style-select") as HTMLInputElement).value;
    setStylePreset(selectedStyle);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') { return; }

    setIsLoading(true);

    if (stylePreset === "no style") {
      setStylePreset("");
    }

    const prompt = {
      text: inputValue.trim(),
      stylePreset: stylePreset
    }

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(prompt)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const body = await response.json();

      setImgSrc(`data:image/png;base64,${body.imageByteArray}`);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col flex-auto h-full p-6">
      <h3 className="text-3xl font-medium text-gray-700">Image Playground (Stable Diffusion XL)</h3>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
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
                placeholder="Image prompt"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"/>
            </div>
          </div>
          <select
            className="w-64 ml-4 inline-flex justify-left px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            id="style-select"
            onChange={() => selectStyle()}
          >
            {styles.map((style, index) => (
              <option key={index} value={style}>{style}</option>
            ))}
          </select>
          <div className="ml-4">
            <button
              type="button"
              onClick={sendMessage}
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              <span>Create image</span>
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
                    ></path>
                  </svg>
                </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <div className="col-start-1 col-end-11 p-3 rounded-lg">
                <div className="flex flex-row items-center w-[512px] h-[512px]">
                  {isLoading ? (
                    <div className="container px-6 py-8 mx-auto">
                      <div className="text-center">
                        <div role="status">
                          <svg aria-hidden="true"
                               className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"/>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"/>
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={imgSrc} alt="AI generated image" width="512" height="512"/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images;
