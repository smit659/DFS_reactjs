import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [state, setstate] = useState({
    username:"",
    friendname:""
  });
  const [select,setselect]=useState([]);

  
  const  [posts,setposts]=useState([{username:"",friendname:[]}]);

  var flag=0;
  


   const handlesubmit=(e)=>
   {
    e.preventDefault();
    console.log(posts);
    let f=0;
 
    posts.forEach(element=>{   
    if(element.username===state.username)
    {  
     f=1;
    }
  })
   if(posts[0].username!=='')
    { 

    if(f===1)
    { 
    setposts(posts.map(item =>{   if(  item.username===state.username){ return{...item,friendname:[...item.friendname,state.friendname]}}else{return item }}  ));
    }
    else
    {
      const a={username:state.username,friendname:[state.friendname]};
      setposts(prev=>[...prev,a]);
    }

      }
    else
    {
         setposts(posts.map(object=>{if(object.username===''){return{...object,username:state.username,friendname:[...object.friendname,state.friendname]}}else return object;}));
    }

      
   
  }

  function DFSUtil(vert, visited,arr)
  {
    arr.push(vert);
    visited[vert] = true;
    if(vert===select[1])
    {
      
      flag=1;
      console.log(arr);
      alert(arr);
    }
    else
    { 
       var get_neighbours=[];
      posts.forEach(element=>{   
        if(element.username===vert )
        {  
            
           get_neighbours =element.friendname;
          
        }
       
      });
     for (var i in get_neighbours)
      {
          var get_elem = get_neighbours[i];
          if (!visited[get_elem])
          {
              DFSUtil(get_elem, visited,arr);
             
              
          }
      }
    }
      arr.pop();
      visited[vert] = false;

  }
 function dfs(startingNode,arr)
  {
   
      var visited = {};
   
      DFSUtil(startingNode, visited,arr);
  }
   

 
const evaluateHandler=(e)=>{
 
  var arr=[];
 
   dfs(select[0],arr);
   console.log(flag);
if(flag===0)
  alert("No Relation Between them");

  


}

  const   inputFieldHandler=(e)=>{
    const { name, value } = e.target;
   
    setstate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
   
  }

  return (
    <div className="App main-container">
     
 
     <button type="button" class="btn  new-user-btn btn-outline-success btn-lg"  data-toggle="modal" data-target="#exampleModalCenter" >Add New User</button>
     <br></br>
     <br></br> <br></br>
     <button type="button"  onClick={evaluateHandler} class="btn  new-user-btn btn-outline-danger btn-lg"   >Evaluate</button>

  
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add Detail </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={handlesubmit} className="form-submit">
      <div class="modal-body">

      
  <div class="form-group">
    <label for="exampleInputEmail1">USER NAME</label>
    <input  name="username" required onChange={inputFieldHandler} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter UserName"/>

  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">FRIEND NAME</label>
    <input name="friendname"    onChange={inputFieldHandler} type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter his/her Friend"/>
  </div>
  
  


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  type="submit" class="btn add-btn btn-outline-success">Add</button>
      </div>
      </form>
    </div>
  </div>
</div>
{(posts[0].username!=='')
  ?
<div style={{display:'grid', gridTemplateColumns: '2fr 2fr 2fr'}}>

{  posts.map((item,i)=>(
  
  <div key={Math.random()} style={{width:'40%',margin:'2%'}}class="card">
  <div class="card-header">
  <h5 style={{color:'green',margin:'10%'}} class="card-title">{item.username}</h5>
  </div>
  <div class="card-body">
  
  {  item.friendname &&   item.friendname.map((prop,i)=>{return(<h5 key={Math.random()}style={{color:'red',margin:'10%'}} class="card-title">{prop}</h5>)})}

    <a style={{backgroundColor:'blue'}} onClick={(e)=>setselect(prev=>[...prev,item.username])} href="#" class="btn-select  btn btn-primary">Select</a>
  </div>
</div>
                    )
           )           
}
</div>
  :
<div></div>

}
    
    </div>
  );

}

export default App;