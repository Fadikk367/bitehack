import React, {useState, useEffeft} from 'react';
import List from './List';
import Temp from './Temp';
import '../styles/Dashboard.scss';
import CytoscapeComponent from 'react-cytoscapejs';
import popper from 'cytoscape-popper';
import Cytoscape from 'cytoscape';

Cytoscape.use(popper);

const Dashboard = props => {
  const lists = props.lists ? props.lists.map((list, idx) => (
    <Temp key={idx} list={list} previous={list.relations[0]}/>
  )) : null;
  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 10, y: 10 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 10 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2',"arrow": "triangle" } }
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
      
      let div= document.createElement('div');  
      let text= document.createElement('div');    
      text.innerHTML = 'Mój div';
      text.classList.add('text')
      div.appendChild( text );
      cy.ready(function () {
        let node = cy.nodes().first();
        let popper = node.popper({
          content: () => {             
      
            document.body.appendChild( div );
      
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
      <CytoscapeComponent  cy={(cy)=> {cytoscapejsAfterInit(cy)}} elements={elements} stylesheet={stylesheet} style={ { width: '600px', height: '600px' } } />
      {lists}
      <Temp />
    </div>
  );
}

export default Dashboard;
