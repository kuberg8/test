import React, { useState, useEffect } from "react";
import { parseArr, sortByTypeArr } from "./util/editors";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function App() {
  const [data, setData] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valuesSelect, setValuesSelect] = useState({});

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json")
      .then((res) => res.json())
      .then((data) => {
        const correctData = parseArr(data.testArr);
        const sortData = sortByTypeArr(correctData);
        setData(sortData);
        setAllOptions(correctData);
        // setValuesSelect(Object.assign({}, sortData));
      })
      .catch(() => alert("Произошла ошибка"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <React.Fragment>Загрузка...</React.Fragment>;
  else {
    return (
      <React.Fragment>
        {data.map((options, index) => (
          <div key={index + "select"} style={{ marginBottom: "20px" }}>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              value={valuesSelect[index]}
              onChange={(inputValue) =>
                setValuesSelect({ ...valuesSelect, [index]: inputValue })
              }
            />
          </div>
        ))}

        <ul>
          {allOptions.map((item, index) => (
            <li key={index + "li"}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default App;
