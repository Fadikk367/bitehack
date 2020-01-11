import React, {useState, useEffeft} from 'react';
import List from './List';
import Temp from './Temp';
import '../styles/Dashboard.scss';
import CytoscapeComponent from 'react-cytoscapejs';
import popper from 'cytoscape-popper';
import klay from 'cytoscape-klay';
import Cytoscape from 'cytoscape';

Cytoscape.use(klay);
Cytoscape.use(popper);

const Dashboard = props => {
  const lists = props.lists ? props.lists.map((list, idx) => (
    <Temp key={idx} list={list} previous={list.relations[0]}/>
  )) : null;
  const elements = [
    { data: { id: 'one', label: 'Node 1' },  },
    { data: { id: 'two', label: 'Node 2' },  },
    { data: { id: 't3', label: 'Node 3' },  },
    { data: { id: 't4', label: 'Node 3' },  },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2',"arrow": "triangle" } },
    { data: { source: 'two', target: 't3', label: 'Edge from Node1 to Node2',"arrow": "triangle" } },
    { data: { source: 'two', target: 't4', label: 'Edge from Node1 to Node2',"arrow": "triangle" } },
 ];
 const stylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(id)'
    }
  },

  {
    selector: 'edge',
    style: {
      'width': 3,
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
    if(cy)
    {
      
      
      
      let div  = document.createElement('div');  
      let dash = document.getElementsByClassName('dashboard')[0];  
      let text = document.createElement('div');    
      text.innerHTML = 'Mój div';
      text.classList.add('text')
      div.appendChild( text );
      cy.ready(function () {
        let node = cy.nodes().first();
        let popper = node.popper({
          content: () => {             
      
            dash.appendChild( div );
      
            return div;
          }
        });
      
        let update = () => {
          text.style.transform= `scale(${cy.zoom()})`;
          text.innerHTML = `${cy.zoom()}`;
          text.style.color = "blue";
          popper.scheduleUpdate();
        };
        node.on('position', update);
        cy.on('pan resize zoom', update);
        
      });
      cy.on('click', function(e){     
      
       console.log(cy.nodes().positions(
        function( node, i ){
          return {
            x: node.position().x+10,
            y: node.position().y+10
          }
        }
       ))
      })
    }     
 }
  return(
    <div className="dashboard">
      <h2>Dashboard</h2>
      <CytoscapeComponent  cy={(cy)=> {cytoscapejsAfterInit(cy)}} elements={elements} stylesheet={stylesheet} layout={{name: 'klay'}} style={ { width: '100%', height: '100%' } } />

    </div>
  );
}

export default Dashboard;
