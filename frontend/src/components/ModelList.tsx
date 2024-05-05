import useModelFetch from '../api/useModelFetch';
import { ModelResponse } from '../types/types';

function ModelList() {
  const data = useModelFetch("/foundation-models") as ModelResponse[];

  return (
    <div className="overflow-hidden sm:rounded-lg">
      <table className="w-full">
        <thead>
        <tr>
          <th className="px-6 py-4 text-xs font-medium leading-4 tracking-wider text-left text-gray-200 uppercase border-b border-gray-200 bg-gray-900">
            Provider
          </th>
          <th className="px-6 py-4 text-xs font-medium leading-4 tracking-wider text-left text-gray-200 uppercase border-b border-gray-200 bg-gray-900">
            Name
          </th>
          <th className="px-6 py-4 border-b border-gray-200 bg-gray-900"></th>
        </tr>
        </thead>
        <tbody className="bg-white">
        {data.map(item => (
          <tr key={item.modelId}>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              {item.providerName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              {item.modelName}
            </td>
            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
              <a href={`/models/${item.modelId}`}
                 className="text-indigo-600 hover:text-indigo-900">Show details</a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default ModelList;
