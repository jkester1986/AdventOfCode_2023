import fs from 'fs'
import clipboardy from 'clipboardy';

fs.readFile('Day25.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split('\n');
  let connections = {};

  let copyText = "";
  lines.forEach(line => {
      let components = line.split(" ");
      let startingComponent = components[0];
      components.shift();
      startingComponent = startingComponent.split(":")[0];

      if(!connections[startingComponent])
        connections[startingComponent] = new Set(components);
      else
        components.forEach(component => {
          connections[startingComponent].add(component);
      });

      components.forEach(component => {
          // this was only needed to generate the graph
          copyText += `${startingComponent} -> ${component}\n`;

          if(!connections[component]) {
            connections[component] = new Set([startingComponent]);
          }
          else {
            connections[component].add(startingComponent);
          }
      });
  });

  connections = new Map(Object.entries(connections));

  // copied to clipboard, threw in viz-js.com, figured out 
  // to remove qlc->mqb, khn-nrs, xqh-ssd;
  // manually removed them from the input
  // clipboardy.writeSync(copyText);
  
  // console.log(eliminateComponents(connections))
  console.log(eliminateComponents(connections) * eliminateComponents(connections));
});

// grab a wire and remove it. replace all links to it with its own links. Repeat until there are none left
// make sure tracking count of wires removed while doing so
function eliminateComponents(connections) {
  // console.log("--------------------------------------------------------------------")
  let [wire] = connections.keys();
  let count = 0;
  while (wire) {
    // console.log("removing wire:", wire)
    // console.log({ connections })
    let links = connections.get(wire);
    connections.delete(wire);
    let linksToDelete = [];
    let newWire = null;
    links?.forEach(link => {
      connections.get(link)?.delete(wire);
      links.forEach(link2 => {
        // console.log({ link, oldLinks: connections.get(link) })
        if (link !== link2 && !connections.get(link)?.has(link2)) {
          connections.get(link)?.add(link2);
        }
      });
      // console.log({ link, newLinks: connections.get(link) })
    });
    // see if there are any links to remove
    links?.forEach(link => {
      if (!connections.get(link)?.size)
        linksToDelete.push(link);
      // find a link that's still got connections, and set it for the new wire if not already set
      else if (!newWire)
        newWire = link;
    });
    // console.log({ linksToDelete })
    linksToDelete.forEach(link => {
      // console.log("deleting link", link)
      connections.delete(link);
      count++;
    });
    count++;

    // new wire will be one from the existing links that we just updated
    wire = newWire;
  }

  // console.log("connections at end:", connections)

  return count;
}