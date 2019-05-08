import _ from 'lodash';
import printMe from './print';
import './style.css';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  element.appendChild(btn);

  btn.innerHTML = 'click me';
  btn.onclick = printMe;

  return element;
}

let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('Accepting the updated printMe module!');
    printMe();
    
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
