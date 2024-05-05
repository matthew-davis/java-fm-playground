import { produce } from "immer";
import { LRUCache } from "lru-cache";
import md5 from "md5";
import { GlobalConfig } from "../app.config";
import { ModelCacheStatus } from "../types/types";

const cache: LRUCache<string, any> = new LRUCache({ max: 50 });

const useModelFetch = (endpoint: string) => {
  const url = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;
  const key = md5(url);

  const value: ModelCacheStatus = cache.get(key) || { status: 'NEW', data: null };

  if (value.status === 'RESOLVED') {
    return value.data;
  }

  const promise = fetch(url).then(response => response.json());

  promise.then(data => {
    value.status = "RESOLVED";
    value.data = data;
    cache.set(
      key,
      produce(value, draft => {
        draft.status = "RESOLVED";
        draft.data = data;
      }));
  })

  throw promise
};

export default useModelFetch;
