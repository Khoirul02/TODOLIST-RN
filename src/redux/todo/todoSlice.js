/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TodoServices from '../../services/todo';
import CalendarServices from '../../services/calendar';
export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (payload, thunkAPI) => {
    try {
      let message = '';
      await TodoServices.createTodo(payload)
        .then(res => {
          message = res;
        });
      return {message: message};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (payload, thunkAPI) => {
    try {
      let message = '';
      await TodoServices.updateTodo(payload).then(res => {
        message = res;
      });
      return {message: message};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (payload, thunkAPI) => {
    try {
      let message = '';
      await TodoServices.deleteTodo(payload).then(res => {
        console.log('RESPONSE', res);
        message = res;
      });
      return {message: message};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getTodo = createAsyncThunk(
  'todo/getTodo',
  async (thunkAPI) => {
    try {
      let data = '';
      await TodoServices.getTodo()
        .then(res => {
            data = res;
        });
      return {data: data};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const sendTodoToCalendar = createAsyncThunk(
  'todo/sendTodoToCalendar',
  async (payload, thunkAPI) => {
    try {
      let message = '';
      await CalendarServices.sendToCalendar(payload).then(res => {
        message = 'Success Prosess Add Calendar';
      });
      return {message: message};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isLoading: true,
  message: '',
  id : '',
  title: '',
  description: '',
  location : '',
  date: '',
  time: '',
  timeEnd : '',
  listTodo: [],
  typeModal: {
    type: '',
    title: '',
    data: '',
    action: '',
  },
  modal: false,
  showDate : false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setTypeModal: (state, action) => {
      state.typeModal = action.payload;
    },
    setShowDate: (state, action) => {
      state.showDate = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setTimeEnd: (state, action) => {
      state.timeEnd = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearStateAfterAction: state => {
      state.id = '';
      state.title = '';
      state.description = '';
      state.location = '';
      state.date = '';
      state.time = '';
      state.timeEnd = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listTodo = action.payload.data;
        state.message =
          action.payload.data.length === 0 ? 'File Not Found' : '';
      })
      .addCase(getTodo.rejected, state => {
        state.isLoading = false;
        state.listTodo = [];
        state.message = 'Failed Proses Data!';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createTodo.rejected, state => {
        state.isLoading = false;
        state.message = 'Failed Proses Data!';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateTodo.rejected, state => {
        state.isLoading = false;
        state.message = 'Failed Proses Data!';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteTodo.rejected, state => {
        state.isLoading = false;
        state.message = 'Failed Proses Data!';
      })
      .addCase(sendTodoToCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(sendTodoToCalendar.rejected, state => {
        state.isLoading = false;
        state.message = 'Failed Proses Data!';
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setTitle,
  setDescription,
  setDate,
  setModal,
  setTypeModal,
  setShowDate,
  setLocation,
  setId,
  setTime,
  setTimeEnd,
  setLoading,
  clearStateAfterAction,
} = todoSlice.actions;

const reducer = todoSlice.reducer;
export default reducer;
