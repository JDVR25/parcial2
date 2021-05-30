import React, { useEffect, useState } from "react";
import { getHomeById } from "../../services/utils";
import { Card } from "../../components/roomCard/Card"
import { useParams } from "react-router";
import "./HomeDetail.scss";

export const HomeDetail = () => {
  const [home, setHome] = useState([]);
  const [devices, setDevices] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getHomeById(id).then((data) => { setHome(data) });
  }, [id]);
  return (
    <div className="container home">
      <div className="row"><h1>
        My rooms
      </h1></div>
      <div className="row">
        {home.rooms && home.rooms.map((room) => <Card className="tarjeta" setDevices={setDevices} name={room.name} devices={room.devices} type={room.type} powerUsage={room.powerUsage} ></Card>)}
        <div className="column">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Device</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {devices && devices.map((device,index) => <tr>
                <th scope="row">{index+1}</th>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.desired.value}</td>
              </tr>)}
            </tbody>
          </table>


        </div>
      </div>

    </div>
  );
};