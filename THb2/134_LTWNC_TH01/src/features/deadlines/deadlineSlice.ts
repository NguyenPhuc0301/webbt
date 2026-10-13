
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  CreateDeadlineInput,
  Deadline,
  DeadlineFilter,
  DeadlineState,
} from "./types";

import {
  createDeadlineAPI,
  fetchDeadlines,
} from "./deadlineAPI";

const initialState: DeadlineState = {
  items: [],
  loading: false,
  error: null,
  filter: "all",
};

// Async Thunk: tải danh sách ban đầu.
export const loadDeadlines = createAsyncThunk<
  Deadline[],
  void,
  { rejectValue: string }
>("deadlines/loadDeadlines", async (_, { rejectWithValue }) => {
  try {
    return await fetchDeadlines();
  } catch {
    return rejectWithValue("Không thể tải danh sách bài tập.");
  }
});

// Async Thunk: tạo bài tập.
export const addDeadline = createAsyncThunk<
  Deadline,
  CreateDeadlineInput,
  { rejectValue: string }
>("deadlines/addDeadline", async (input, { rejectWithValue }) => {
  try {
    return await createDeadlineAPI(input);
  } catch {
    return rejectWithValue("Không thể tạo bài tập.");
  }
});

const deadlineSlice = createSlice({
  name: "deadlines",
  initialState,
  reducers: {
    toggleDeadline(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (deadline) => deadline.id === action.payload,
      );

      if (item) {
        item.completed = !item.completed;
      }
    },

    deleteDeadline(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (deadline) => deadline.id !== action.payload,
      );
    },

    setDeadlineFilter(
      state,
      action: PayloadAction<DeadlineFilter>,
    ) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDeadlines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadDeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Đã xảy ra lỗi khi tải dữ liệu.";
      })
      .addCase(addDeadline.pending, (state) => {
        state.error = null;
      })
      .addCase(addDeadline.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addDeadline.rejected, (state, action) => {
        state.error =
          action.payload ?? "Không thể thêm bài tập.";
      });
  },
});

export const {
  toggleDeadline,
  deleteDeadline,
  setDeadlineFilter,
} = deadlineSlice.actions;

export default deadlineSlice.reducer;
