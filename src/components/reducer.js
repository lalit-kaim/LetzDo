import { initialize } from "./Config";
import firebase from 'firebase'

const initialState = {
    todoRoot : []
}

let userid = null

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TO_TODOZ':
            if(action.todovalue.trim().length===0){
                return state
            }
            let found = state.todoRoot.find((el)=>{
                return el.date===action.tododate;
            });
            let foundIndex = state.todoRoot.indexOf(found);
            if(foundIndex === -1){
                foundIndex = state.todoRoot.length;
                let lk= [...state.todoRoot]
                lk.push({todoList:[],date:action.tododate,mytitle:''})
                state.todoRoot=lk;
            }

            let lk={...state};
            lk.todoRoot[foundIndex].todoList.push(action.todovalue)
            state=lk;
            localStorage.setItem('localstate', JSON.stringify(state))
            // const firebase = firebase.database();
            firebase.database().ref('letzdo/'+initialize.auth().currentUser.uid).set(state)
                
            return state;

        case 'DELETE_FROM_TODOZ':
            let dfound = state.todoRoot.find((el)=>{
                return el.date===action.deleteDate;
            });
            let DIndex = state.todoRoot.indexOf(dfound);
            let temp={...state};
            temp.todoRoot[DIndex].todoList.splice(action.deleteIndex,1);

            if(temp.todoRoot[DIndex].todoList.length===0){
                temp.todoRoot.splice(DIndex,1);
            }

            state=temp;

            localStorage.setItem('localstate', JSON.stringify(state))
            firebase.database().ref('letzdo/'+initialize.auth().currentUser.uid).set(state)

            return state;

        case 'ADD_TITLE':
            let Tfound = state.todoRoot.find((el)=>{
                return el.date===action.titledate;
            });
            let TfoundIndex = state.todoRoot.indexOf(Tfound);
            let Ttemp={...state}
            if(TfoundIndex!==   -1)
                Ttemp.todoRoot[TfoundIndex].mytitle=action.mytitle
            else{
                Ttemp.todoRoot.push({todoList:[],date:action.titledate,mytitle:action.mytitle})
            }

            state=Ttemp
            localStorage.setItem('localstate', JSON.stringify(state))
            firebase.database().ref('letzdo/'+initialize.auth().currentUser.uid).set(state)

            return state;
        case 'LOGIN':
            userid = initialize.auth().currentUser.uid;
            const refr = firebase.database().ref('letzdo/'+initialize.auth().currentUser.uid);
            refr.once('value').then(snapshot => {
                if(snapshot.val())
                    state.todoRoot=[...snapshot.val().todoRoot]
                localStorage.setItem('localstate', JSON.stringify(state))
                localStorage.setItem('user',JSON.stringify(userid))
            });
            return state
            
        case 'LOGOUT':
            state = {todoRoot:[]}
            return state
        default:
            if(userid){
                const refr = firebase.database().ref('letzdo/'+userid);
                refr.once('value').then(snapshot => {
                    if(snapshot.val())
                        state={...snapshot.val()}
                    return state
                });
                return state
            }
            else{
                if(localStorage.getItem('localstate'))
                    state = JSON.parse(localStorage.getItem('localstate'));
                return state;
            }
    }
}


export default reducer;