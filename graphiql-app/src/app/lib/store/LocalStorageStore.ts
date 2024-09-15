"use client";

import {
  HistoryPayload,
  HistoryLocalStorageRecord,
  HistorySavedItem,
  HistoryRecordType,
} from "@app/lib/types/types";
import { notEmptyString, safeString } from "@app/lib/utils/stringUtils";

export type AppLocalStorage = {
  addToHistory: (
    recordType: HistoryPayload,
    type: HistoryRecordType,
    userId: string,
  ) => void;
  getHistory: (userId: string) => HistorySavedItem[];
};

export function getAppLocalStorage(): AppLocalStorage {
  function addToHistory(
    payload: HistoryPayload,
    type: HistoryRecordType,
    userId: string,
  ) {
    const KEY = generateHistoryKey(userId);

    let res: HistoryLocalStorageRecord | null = null;

    let obj = getObj(KEY);
    if (obj) {
      res = obj as HistoryLocalStorageRecord;
    }

    if (!res || !res.list) {
      res = {
        list: [],
      };
    }

    const newItem: HistorySavedItem = {
      userId,
      ts: new Date().getTime(),
      type,
      payload,
    };

    res.list.push(newItem);

    setObj(KEY, res);
  }

  function getHistory(userId: string): HistorySavedItem[] {
    const KEY = generateHistoryKey(userId);

    let res: HistoryLocalStorageRecord | null = null;
    let obj = getObj(KEY);
    if (obj) {
      res = obj as HistoryLocalStorageRecord;

      if (res.list) {
        return res.list;
      }
    }

    return [];
  }

  function generateHistoryKey(userId: string): string {
    const LOCAL_STORAGE_REST_GRAPHI_CLIENT_KEY = "REST_GRAPHI_CLIENT_H_v1";
    return `${LOCAL_STORAGE_REST_GRAPHI_CLIENT_KEY}/${userId}`;
  }

  function getObj(key: string): Object | null {
    let itemStr: string | null = localStorage.getItem(key);
    if (notEmptyString(itemStr)) {
      return JSON.parse(safeString(itemStr));
    }
    return null;
  }

  function setObj(key: string, value: Object): void {
    if (key) {
      let valueStr;
      if (value) {
        valueStr = JSON.stringify(value);
      } else {
        valueStr = "";
      }

      localStorage.setItem(key, valueStr);
    }
  }

  return {
    addToHistory,
    getHistory,
  };
}
