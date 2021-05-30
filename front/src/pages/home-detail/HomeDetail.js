import React, { useEffect, useState } from "react";
import { getHomeById } from "../../services/utils";
import { Card } from "../../components/roomCard/Card"
import { useParams } from "react-router";
import "./HomeDetail.scss";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";

export const HomeDetail = () => {
  const [home, setHome] = useState([]);
  const [devices, setDevices] = useState([]);
  const [drawnPie, setPie] = useState(false);
  let { id } = useParams();
  useEffect(() => {

    if (!navigator.onLine) {
      console.log(localStorage.getItem(id));
      if (localStorage.getItem(id) === null) setHome("loading...");
      else setHome(JSON.parse(localStorage.getItem(id)));
    }
    getHomeById(id).then((data) => {
      setHome(data);
      localStorage.setItem(id, JSON.stringify(data));
      console.log("Response", JSON.stringify(data));
    });
  }, [id]);


  function drawPie() {
    if (!drawnPie) {
      var width = 300;
      var height = 300;
      var radius = Math.min(width, height) / 2;

      var color = d3.scaleOrdinal()
        .range(["#5EC9A9", "#AFE4B8", "#539CC6", "#323595", "#C2D5EB"]);

      var pie = d3.pie()
        .value(function (d) {
          return d.powerUsage.value;
        })(home.rooms);

      var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var svg = d3.select("#pie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var div = d3.select("body").append("div")
        .attr("class", "tooltip-pie")
        .style("opacity", 0);

      var g = svg.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("class", "arc")
        .on('mouseover', function (d, i) {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.95');
          div.transition()
            .duration(50)
            .style("opacity", 1);
          let num = i.data.name + ":" + i.data.powerUsage.value + i.data.powerUsage.unit;
          div.html(num)
            .style("left", (d.pageX + 10) + "px")
            .style("top", (d.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
          div.transition()
            .duration('50')
            .style("opacity", 0);
        })
        .attr('transform', 'translate(0, 0)');

      g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color(d.data.name);
        });
      setPie(true);
    }

  }



  return (
    <div className="container home">
      <div className="row"><h1>
        <FormattedMessage id="myRooms" />
      </h1></div>
      <div className="row">
        {home.rooms && home.rooms.map((room) => <Card className="tarjeta" setDevices={setDevices} name={room.name} devices={room.devices} type={room.type} powerUsage={room.powerUsage} ></Card>)}
        <div className="column">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col"><FormattedMessage id="device" /></th>
                <th scope="col"><FormattedMessage id="value" /></th>
              </tr>
            </thead>
            <tbody>
              {devices && devices.map((device, index) => <tr>
                <th scope="row">{index + 1}</th>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{String(device.desired.value)}</td>
              </tr>)}
            </tbody>
          </table>


        </div>
      </div>
      <div className="row"><h3>
        <FormattedMessage id="stats" /></h3>
        <div id="pie">
          {home.rooms && drawPie()}
        </div>
      </div>
    </div>
  );
};