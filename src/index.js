import _ from 'lodash';
import printMe from './print';

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

document.body.appendChild(component());
