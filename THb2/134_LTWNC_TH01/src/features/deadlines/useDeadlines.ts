
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addDeadline,
  deleteDeadline,
  loadDeadlines,
  setDeadlineFilter,
  toggleDeadline,
} from "./deadlineSlice";
import { filterDeadlines } from "./deadlineUtils";
import type {
  CreateDeadlineInput,
  DeadlineFilter,
} from "./types";

export function useDeadlines() {
  const dispatch = useAppDispatch();

  const {
    items,
    loading,
    error,
    filter,
  } = useAppSelector((state) => state.deadlines);

  // Tải dữ liệu mẫu khi ứng dụng khởi động.
  useEffect(() => {
    void dispatch(loadDeadlines());
  }, [dispatch]);

  const filteredItems = filterDeadlines(items, filter);

  const create = (input: CreateDeadlineInput) =>
    dispatch(addDeadline(input));

  const toggle = (id: string) =>
    dispatch(toggleDeadline(id));

  const remove = (id: string) =>
    dispatch(deleteDeadline(id));

  const changeFilter = (value: DeadlineFilter) =>
    dispatch(setDeadlineFilter(value));

  return {
    items: filteredItems,
    allItems: items,
    loading,
    error,
    filter,
    create,
    toggle,
    remove,
    changeFilter,
  };
}
