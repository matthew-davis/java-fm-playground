import { useParams } from 'react-router-dom';
import useModelFetch from '../api/useModelFetch';
import { ModelResponse } from '../types/types';

function ModelDetails() {
  const { modelId} = useParams();
  const data = useModelFetch(`/foundation-models/model/${modelId}`) as ModelResponse;

  return (
    <div className="overflow-hidden sm:rounded-lg">
      <table className="w-full">
        <tbody className="bg-white">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Provider:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.providerName}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Name:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.modelName}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Model ID:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.modelId}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Customizations:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.customizationsSupported}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Output Modalities:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.outputModalities}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-200 bg-gray-900">
            Model ARN:
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
            {data.modelArn}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ModelDetails;
