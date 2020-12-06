// https://observablehq.com/@philipp-ulm/network-of-stack-overflow-tags@527
export default function define(runtime, observer) {
  const main = runtime.module();
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // # Network of Stack Overflow Tags

  // **Homework 5** - ISIS 4822: Visual Analytics

  // **Philipp Freiherr von Ulm-Erbach**, p.freiherr@uniandes.edu.co`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Context

  // In order to be able to find out which technology ecosystems are related to each other, a data team of Stack Overflow has analyzed the frequency of related appearance of technology tags in their Developer Stories (Stack Overflows professional profiles).`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Visualization:`;
  //   });
  // main.variable(observer()).define(["html"], function (html) {
  //   return html`
  //     <hr />
  //     <div align="center">
  //       <h2>Stack Overflow Tag Network</h2>
  //       <div>
  //         Network of Stack Overflow tags based on their use in Developer Stories
  //       </div>
  //     </div>
  //   `;
  // });
  main.variable(observer()).define(["drawChart"], function (drawChart) {
    return drawChart();
  });
  // main.variable(observer()).define(["html"], function (html) {
  //   return html` <div align="center">
  //     <strong>By:</strong> Philipp Ulm-Erbach
  //     <br />
  //     <strong>Source</strong>:
  //     <a
  //       href="https://gist.githubusercontent.com/philipp-ulm/8aac32439e2fb92a3dad3da443f692e8/raw/93710da0594c0344a9d1f55bcbdfd67782946b96/stack-overflow-network.json"
  //       >Stack Overflow - Kaggle</a
  //     >
  //     <hr />
  //   </div>`;
  // });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Analysis of Visualization based on Munzer`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## What ?

  //       The data used for this assignment was taken from [Kaggle](https://www.kaggle.com/stackoverflow/stack-overflow-tag-network/data).

  //       The data in JSON format can be found [here](https://gist.githubusercontent.com/philipp-ulm/8aac32439e2fb92a3dad3da443f692e8/raw/93710da0594c0344a9d1f55bcbdfd67782946b96/stack-overflow-network.json).
  //       This dataset has the following structure:

  //       **Dataset Type: Network** format containing nodes, links and attributes

  //       **Static availability**`;
  //   });
  // main.variable(observer()).define(["html"], function (html) {
  //   const table = html` <table style="width:100%">
  //       <tr>
  //         <th>Attribute</th>
  //         <th>Type of Attribute</th>
  //         <th>Ordering direction</th>
  //       </tr>
  //       <tr>
  //         <td>Links.source</td>
  //         <td>Categorical</td>
  //         <td>-</td>
  //       </tr>
  //       <tr>
  //         <td>Links.target</td>
  //         <td>Categorical</td>
  //         <td>-</td>
  //       </tr>
  //       <tr>
  //         <td>Links.value</td>
  //         <td>Ordered Quantitative</td>
  //         <td>Sequential</td>
  //       </tr>
  //       <tr>
  //         <td>Node.name</td>
  //         <td>Categorical</td>
  //         <td>-</td>
  //       </tr>
  //       <tr>
  //         <td>Node.group</td>
  //         <td>Categorical</td>
  //         <td>-</td>
  //       </tr>
  //     </table>
  //     <br />`;
  //   return table;
  // });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Why ?

  //       ### Tarea Principal:

  //       **T1:** Explore how technological ecosystems are related to each other **{Explore, Topology}**

  //       ### Tareas Secundarias:

  //       **T2:** Locate the relationship between different technologies **{Locate, Paths}**

  //       **T3:** Visualize the membership of a technology to a specific group or cluster of related technologies **{Locate, Clusters}**`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## How ?

  //       The idiom used for this visualization is a type of network graph called **Force Directed Graph**.

  //       - **Encode->Arrange->Separate:** D3 forces are used to separate and connect the nodes. Firstly, the 'link' force is used to connect related nodes. Secondly, a 'charge' force is used to separate unrelated (unlinked) nodes. Finally, a 'center' force makes the visualization stay centered in the viewbox.

  //       - **Encode->Map->Hue:** The resulting clustering categories are indicated using categorical hues.

  //       - **Manipulate->Select:** A tooltip creates a highlight of the chosen node and all its direct neighours including their node names.

  //       - **Manipulate->Change:** A drag simulation allows the user to move nodes and clusters around the viewbox to avoid **occlusion**. Also, the nodes have been forced to stay in the viewbox to prevent loss of information in case they might leave the viewbox due to 'charge' forces.

  //       - **Encode->Map->Motion:** A simulation when loading or changing the visualization highlights bonds between data.`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Example Insights

  // - Darker green area represents a tech ecosystem closely related to web development, including for example JS, CSS, HTML, PHP and similar.

  // - Nodes like 'java' create a bridge between different clusters. In this example it is linked to its own group containing java-related fields such as maven, eclipse or jsp (java server pages), but also to other categories such as operating systems (pink) or other object orientated programming languages (light green)

  // - Tag groups such as [excel,vba] or [agile, tdd (test driven design)] are not often used in combination with other tags in Stack Overflows professional profiles.`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Code`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // #### Network Graph`;
  //   });
  main
    .variable(observer("drawChart"))
    .define(
      "drawChart",
      ["data", "d3", "width", "height", "color", "drag", "invalidation"],
      function (data, d3, width, height, color, drag, invalidation) {
        return function drawChart() {
          const links = data.links.map((d) => Object.create(d));
          const nodes = data.nodes.map((d) => Object.create(d));

          const radius = 7;

          // const tooltip = d3
          //   .select("body")
          //   .append("div")
          //   .attr("class", "tooltip")
          //   .style("opacity", 0);

          const simulation = d3
            .forceSimulation(nodes)
            .force(
              "link",
              d3.forceLink(links).id((d) => d.name)
            )
            //.force("charge", d3.forceManyBody().strength(-15))
            .force(
              "charge",
              d3
                .forceManyBody()
                // .strength(function (d, i) {
                //   var a = i == 0 ? -100 : -200;
                //   return a;
                // })
                .strength(-120)
                .distanceMin(20)
                .distanceMax(120)
            )
            .force("center", d3.forceCenter(width / 2, height / 2));

          const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

          const link = svg
            .append("g")
            .attr("stroke", "#aaa")
            .attr("stroke-opacity", 1)
            .selectAll("line")
            .data(links)
            .join("line")
            //.attr("stroke-width", (d) => Math.sqrt(d.value) / 2);
            .attr("stroke-width", (d) => d.value);

          const node = svg
            .append("g")
            .attr("stroke", "#000")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            //.attr("r", radius)
            .attr("r", function (d) {
              //return Math.sqrt(d.nodesize);
              return d.nodesize / 10;
            })
            .attr("fill", color)
            .call(drag(simulation))
            .on("mouseover.fade", fade(0.1))
            .on("mouseout.fade", fade(1));

          const textElems = svg
            .append("g")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .text((d) => d.name)
            .attr("font-size", 10)
            .attr("font-size", 10)
            .call(drag(simulation))
            .on("mouseover.fade", fade(0.1))
            .on("mouseout.fade", fade(1));

          simulation.on("tick", () => {
            link
              .attr("x1", (d) => d.source.x)
              .attr("y1", (d) => d.source.y)
              .attr("x2", (d) => d.target.x)
              .attr("y2", (d) => d.target.y);
            node
              .attr("cx", function (d) {
                return (d.x = Math.max(
                  radius + 1,
                  Math.min(width - (radius + 1), d.x)
                ));
              })
              .attr("cy", function (d) {
                return (d.y = Math.max(
                  radius + 1,
                  Math.min(height - (radius + 1), d.y)
                ));
              });
            textElems
              .attr("x", (d) => d.x + 10)
              .attr("y", (d) => d.y)
              .attr("visibility", "visible");
          });

          function fade(opacity) {
            return (d) => {
              node.style("opacity", function (o) {
                return isConnected(d, o) ? 1 : opacity;
              });
              textElems.style("visibility", function (o) {
                return isConnected(d, o) ? "visible" : "hidden";
              });
              link.style("stroke-opacity", (o) =>
                o.source === d || o.target === d ? 1 : opacity
              );
              if (opacity === 1) {
                node.style("opacity", 1);
                textElems.style("visibility", "visible");
                link.style("stroke-opacity", 0.5);
              }
            };
          }

          const linkedByIndex = {};
          links.forEach((d) => {
            linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
          });

          function isConnected(a, b) {
            return (
              linkedByIndex[`${a.index},${b.index}`] ||
              linkedByIndex[`${b.index},${a.index}`] ||
              a.index === b.index
            );
          }

          invalidation.then(() => simulation.stop());

          return svg.node();
        };
      }
    );
  main.variable(observer("height")).define("height", function () {
    return 700;
  });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // #### Drag Function`;
  //   });
  main.variable(observer("drag")).define("drag", ["d3"], function (d3) {
    return (simulation) => {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };
  });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // #### Color Code`;
  //   });
  main.variable(observer("color")).define("color", ["d3"], function (d3) {
    const scale = d3.scaleOrdinal(d3.schemeSet2);
    return (d) => scale(d.group);
  });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Imports`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // #### Data Import`;
  //   });
  main.variable(observer("data")).define("data", ["d3"], function (d3) {
    return d3.json(
      //"https://gist.githubusercontent.com/philipp-ulm/8aac32439e2fb92a3dad3da443f692e8/raw/93710da0594c0344a9d1f55bcbdfd67782946b96/stack-overflow-network.json"
      "data.json"
    );
  });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // #### D3 Import`;
  //   });
  main.variable(observer("d3")).define("d3", ["require"], function (require) {
    return require("d3@5");
  });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## Acknowledgements`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // This visualization is based on the ideas and code of the following works of the following academics:

  // M. Bostock: [Force Directed Graph](https://observablehq.com/@d3/force-directed-graph)

  // A. Suarez: [Layout Highlights](https://bl.ocks.org/almsuarez/4333a12d2531d6c1f6f22b74f2c57102)

  // T. Roth: [Bounding Box](https://tomroth.com.au/fdg-bounding-box/)

  // All Stack Overflow user contributions are licensed under CC-BY-SA 3.0 with attribution required.`;
  //   });
  //   main.variable(observer()).define(["md"], function (md) {
  //     return md`
  // ## MIT License

  // ### Copyright (c) 2019 Philipp Freiherr von Ulm-Erbach.

  //   <br>

  //   Permission is hereby granted, free of charge, to any person obtaining a copy
  //   of this software and associated documentation files (the "Software"), to deal
  //   in the Software without restriction, including without limitation the rights
  //   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  //   copies of the Software, and to permit persons to whom the Software is
  //   furnished to do so, subject to the following conditions:

  //   The above copyright notice and this permission notice shall be included in all
  //   copies or substantial portions of the Software.

  //   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  //   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  //   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  //   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  //   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  //   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  //   SOFTWARE.`;
  //   });
  return main;
}
