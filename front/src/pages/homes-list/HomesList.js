import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { getHomes } from "../../services/utils";
import { Card } from "../../components/card/Card"
import { FormattedMessage } from "react-intl";

export const HomesList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("homes") === null) setHomes("loading...");
      else setHomes(JSON.parse(localStorage.getItem("homes")));
    }
    getHomes().then((data) => {
      setHomes(data);
      localStorage.setItem("homes", JSON.stringify(data));
      console.log("Response", JSON.stringify(data));
    });
  }, []);

  return (
    <div className="container home">
      <div className="row"><h1>
        <FormattedMessage id="spaces" />
      </h1></div>
      <div className="row">
        {homes && homes.map((home) => <Card className="tarjeta" id={home.id} name={home.name} owner={home.owner} address={home.address} phone={home.phone} type={home.type} isActive={home.isActive} ></Card>)}
      </div>
    </div>
  );
};
