import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./WeatherBox.css";
import winter from "../img/winter_day.png";
import day from "../img/day_img_1.png";
import rain from "../img/rain_img_2.png";

const weather_bg = [winter, day, rain];

function WeatherBox() {
  const [detail, setDetail] = useState({});
  const [city, setCity] = useState("Delhi");
  const [cityButton, setCityButton] = useState("Delhi");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9dead0531fc81bcd79e6932584f6c9a3`
      )
      .then((response) => {
        console.log(response);
        setDetail(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cityButton]);

  const handleClick = () => {
    setCityButton(city);
  };

  //   const [backGround, setBackGround] = useState(weather_bg[1]);

  const useStyles = makeStyles({
    root: {
      width: 350,
      margin: 40,
      height: 600,

      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      boxShadow: "0px 0px 30px black",
      transition: "all 2s east-in",
    },
    root1: {
      backgroundImage: `url(${weather_bg[1]})`,
      color: "white",
    },
    root2: {
      backgroundImage: `url(${weather_bg[0]})`,
    },
    root3: {
      backgroundImage: `url(${weather_bg[2]})`,
      color: "white",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  let mainClass = classes.root;
  if (typeof detail.main !== "undefined") {
    if (detail.main.humidity > 80) {
      mainClass = `${classes.root3} ${classes.root}`;
    } else if (detail.main.temp - 273 > 20) {
      mainClass = `${classes.root1} ${classes.root}`;
    } else if (detail.main.temp - 273 <= 20) {
      mainClass = `${classes.root2} ${classes.root}`;
    }
  }
  return (
    <div className="container">
      <div className="input__btn">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="container__input"
        />
        <button type="submit" onClick={handleClick} className="container__btn">
          Click
        </button>
      </div>
      {typeof detail.main !== "undefined" ? (
        <Card className={mainClass}>
          <CardContent>
            <div className="box__temp" key={detail.id}>
              {Math.round(detail.main.temp - 273)}
              {/* {detail.id} */}
              {"\u00B0"}
            </div>
            <div className="temp_varience">
              Min Temp : {Math.round(detail.main.temp_min - 273)}{" "}
              &#160;&#160;|&#160;&#160; Max Temp :{" "}
              {Math.round(detail.main.temp_max - 273)}
            </div>
            <div className="box__city">
              {detail.name} , {detail.sys.country}
            </div>
          </CardContent>
        </Card>
      ) : (
        " "
      )}
    </div>
  );
}

export default WeatherBox;
