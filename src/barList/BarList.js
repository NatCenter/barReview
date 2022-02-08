import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import "./barList.css"

export const BarList = () => {
  const [bars, barList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/bars?_embed=reviews`)
      .then((res) => res.json())
      .then((barArray) => {
        barList(barArray);
      });
  }, []);

  return (
    <>
    <div className="barList">
      <h1>Bar list</h1>
      {bars.map((barObject) => {
        return (
          <div key={`barid--${barObject.id}`}>
            <p >
              {" "}
              <Link to={`/barlist/${barObject.id}`}> {barObject.barName}</Link>
            </p>
            <p>Total Reviews:{barObject.reviews.length}</p>
          </div>
        );
      })}
      <Link to={"/barlist/newreview"}>Post your review</Link>
      </div>
    </>
  );
};
