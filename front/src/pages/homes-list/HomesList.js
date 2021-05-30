import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { getHomes } from "../../services/utils";
import { Card } from "../../components/card/Card"

export const HomesList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHomes().then((data) => setHomes(data));
  }, []);

  return (
    <div className="container home">
      <div className="row"><h1>
        Mis espacios
      </h1></div>
      <div className="row">
        {homes && homes.map((home) => <Card className="tarjeta" id={home.id} name={home.name} owner={home.owner} address={home.address} phone={home.phone} type={home.type} isActive={home.isActive} ></Card>)}
      </div>
    </div>
  );
};
