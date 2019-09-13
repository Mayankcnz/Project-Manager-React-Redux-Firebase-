const taskList = (state = [], action) =>{

    switch(action.type){
        case 'ADD_TASK':


        console.log(action.arr,"DREAM");

        return action.arr
        
            //taskList: action.arr
        

         ///return [
            //...state,
            //{
              //  id: action.data.id,
                //heading: action.data.heading,
                //tasks: action.data.tasks
            //}
        //]

        case 'ADD_THIS':
            
            console.log(state);
            console.log(action, "ACTION");
            return [
                ...state,
                {
                    id: 123445,
                    heading: action.data.heading,
                    tasks: []
                }
            ];


        case 'UPDATE_TASKLIST':

        // will receive id identifying a tasklist, find that particular tasklist and update its tasks

        console.log("ACTION ",action);

        return state.map(item =>{

            if(item.id !== action.id)
                return item;

            const tasks = item.tasks;

            return Object.assign({}, item, {tasks: [...action.tasks]});
        })

        case 'DELETE_TASK':
            console.log("check mate", state, "Print state of the reducer", action);

            // find the item by id, then return a new state

        return state.filter(item => item.id !== action.id);
            


        case 'ADD_TO_TASK':

        console.log("here", "taskName", action.item, action.id);

        return  state.map(item => {
            //console.log(item.id, "PRINT ID");
            if (item.id !== action.id) { 
                return item; // no need to change other items
            }

            const tasks = item.tasks;
            return Object.assign({}, item, {tasks: [...tasks, action.item]}); 
        });

        case 'ADD_SUBTASK':

        return  state.map(item => {
            if (item.id !== action.id) { 
                return item; // no need to change other items
            }

          const tasks = item.tasks;
          return Object.assign({}, item, {tasks: [...tasks, action.taskName]}); 
        });


        case 'DELETE_FROM_TASK':

        console.log(action, "ACTUON", state)

        return state.map((item) =>{
            if(item.id === action.id){
                console.log("entering vault");
                   return {
                       heading: item.heading,
                       tasks: item.tasks.filter((task) => task !== action.item)
                   }
            }else {
                return item;
            }
        });

        default:
            return state;
    

        

        

        //console.log(values, "values");


      /**  return state.map((item) =>{
        if(item.heading === action.heading){

            console.log(item, "hacked2");

               return {
                   heading: "heacked",
                   tasks:['yoza']
               }
              // return items;
        }else {
            return item;
        }

       })**/


       /// console.log(state, "loi");
        /** return {
            ...state,
            tasks: {
                ...state.tasks.filter((task) => task != action.item)
            }
        }**/

        /** console.log(state, "Wtf")

        console.log(action.heading, "headig");

       return  state.map(item => {


            if (item.heading !== action.heading) return item; // no need to change other items
            const tasks = item.tasks;
            return Object.assign({}, item, {tasks: [...tasks, action.item]}); // [1]
        });

        //console.log(values, "values");
        **/
     
   
    }
}

export default taskList