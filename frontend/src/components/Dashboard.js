import React, {useState, useEffect,useRef} from 'react';
import List from './List';
import Temp from './Temp';
import '../styles/Dashboard.scss';
import CytoscapeComponent from 'react-cytoscapejs';
import popper from 'cytoscape-popper';
import klay from 'cytoscape-klay';
import Cytoscape from 'cytoscape';
import ReactDOM from 'react-dom';

Cytoscape.use(klay);
Cytoscape.use(popper);

const Dashboard = props => {
  const lists =  props.lists? props.lists.map((list, idx) => (
    <Temp key={idx} list={list} previous={list.relations[0]}/>
  )) : null;
  const elements = [
    
 ];
 const refContainer = useRef(null);
 const layout = {name: 'klay',klay:{spacing: 300,thoroughness: 4,direction:'RIGHT'}};
 const stylesheet = [
  {
    selector: 'node',
    style: {
      'shape':"rectangle",
      'background-color': '#008403',
      'width': "300px",
      'height': "10px",
      "z-compound-depth":"bottom"
    },

  },

  {
    selector: 'node.active',
    style: {
      'background-color': '#266',      
      "z-compound-depth":"top",
    }
  },

  {
    selector: 'edge',
    style: {
      'width': 10,
      "curve-style": "straight",
      'line-color': '#3333ff',
      'target-arrow-color': '#3333ff',
      'target-arrow-shape': 'triangle',
    }
  }
];
 const [cy, setCy] = useState(null);
 async function cytoscapejsAfterInit (c){
    await setCy(c);
    if(cy && props.lists)
    {      
      cy.ready(function () {
        initGraph(cy)
      })  
    }         
 }

 useEffect(() => {
  
});

 function initGraph(cy)
 {

  let container = document.createElement('div');
  container.classList.add("containerTasks")
  document.body.appendChild(container);
  container=refContainer.current;
  
 
  if( props.lists)
  container.innerHTML=" ";
  cy.elements().remove();
  console.log(props.lists)
  console.log("Maping")
  props.lists.map((list, idx) => {createTaskList(list,lists[idx],container);});
  props.lists.map((list, idx) => {cy.add(createEdge(list,props.lists[getRandomInt(props.lists.length)]))});
  let nodeLast = null;
  cy.on('grabon','node',function(e){
    if(nodeLast)
      nodeLast.removeClass("active");
    let node = e.target;
    node.addClass("active");         
    nodeLast = node;
  })
  cy.layout(layout).run();
  cy.fit(cy.nodes());


 }

 function createTaskList(list,reactList,container)
 {
  let nodeObj = createNode(list);
  cy.add(nodeObj);
  let node = cy.$id(nodeObj.data.id);
  let div  = document.createElement('div');  
  div.classList.add('pinDiv'); 
  let scaleDiv = document.createElement('div');    
  scaleDiv.classList.add('scaleDiv');
  div.appendChild( scaleDiv );
  ReactDOM.render(reactList, scaleDiv);

  let popper = node.popper({
    content: () => {             
      container.appendChild( div );    
      
      return div;
    },
    popper:{
      placement: 'bottom-start',
    }
  }); 
  let update = () => {
    scaleDiv.style.transform= `scale(${cy.zoom()})`;
    popper.scheduleUpdate();
  };
  node.on('position', update);
  cy.on('pan resize zoom', update);

  
 }

 function createNode(list)
 {
   return {
    group: 'nodes',
    data:{id:list._id}
   }
 }
 function createEdge(a,b)
 {
   return {
    group: 'edges',
    data:{source:a._id,target:b._id}
   }
 }
 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
  return(
    <div className="dashboard">
      <CytoscapeComponent  cy={(cy)=> {cytoscapejsAfterInit(cy)}} elements={elements} stylesheet={stylesheet} layout={layout} style={ { width: '100%', height: '100%' } } />
        <div ref={refContainer}></div>
    </div>
  );
}

export default Dashboard;
