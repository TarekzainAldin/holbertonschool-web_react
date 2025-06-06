import  {createSlice} from '@redux.js/toolkit'

const initialState ={
    user:{ 
        email:'' , 
        password:''
    },
    isLoggedIn:false
};

const authSlice = createSlice ({
    name : 'auth',
    initialState,
    reducers: {
        login:(state, action) => {
            state.user.email = action.plyload.email;
            state.user.password = action.plyload.password;
            state.isLoggedIn = true;

        },
        logout:(state) => {

        state.user.email = '';
        state.user.password = '';
        state.isLoggedIn = false;
        }
    }
});

export  const {login , logout} = authSlice.actions;
export default authSlice.reducer;