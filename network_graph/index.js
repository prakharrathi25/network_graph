//Constants for the SVG
var width = 800,
    height = 700;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(100)
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

//Read the data from GoTbook1.json
d3.json('data.json', function (data) {
    force.nodes(data.nodes)
        .links(data.links)
        .start();

    var link = svg.selectAll(".link")
        .data(data.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr("r", function (d) { return d.size/10 })
        .style("fill", function (d) {
            return color(d.group);
        })

    node.append("text")
        .attr("dx", 10)
        .attr("dy", ".35em")
        .text(function (d) { return d.name });

    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
            
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        //Changed

        d3.selectAll("circle").attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });

        d3.selectAll("text").attr("x", function (d) {
            return d.x;
        })
            .attr("y", function (d) {
                return d.y;
            });

        //End Changed

    });

}
)


