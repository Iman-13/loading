import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      
      const users = [
        { id: 1, name: 'Amarillo, Ralph Richmond', email: 'ralph@gmail.com' },
        { id: 2, name: 'Ancaja, John Louise', email: 'louise@gmail' },
        { id: 3, name: 'Aviles, Emmanuel', email: 'emman@gmail.com' },
        { id: 4, name: 'Barlan, Elysalyn', email: 'ely@gmail.com' },
        { id: 5, name: 'Bontoc, Reniel', email: 'reniel@gmail.com' },
        { id: 6, name: 'Cablaida, Mery Rose Ann', email: 'mery@gmail.com' },
        { id: 7, name: 'Caliwan, Kyla', email: 'kyla@gmail.com' },
        { id: 8, name: 'Carabido, Carl Kien', email: 'kien@gmail.com' },
        { id: 9, name: 'Capuno, Marianne Mae', email: 'marianne@gmail.com' },
        { id: 10, name: 'Dapatnapo, Katrina', email: 'kat@gmail.com' },
        { id: 11, name: 'de la Cruz, Coedy', email: 'coedy@gmail.com' },
        { id: 12, name: 'Diaz, Jovan Allyn', email: 'jovan@gmail.com' },
        { id: 13, name: 'Dinglasan, Junelle', email: 'junelle@gmail' },
        { id: 14, name: 'Felonia, Margarette Ann', email: 'marga@gmail.com' },
        { id: 15, name: 'Gamba, Ron Jerick', email: 'ron@gmail' }
      ];
      
      return users;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  }
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;