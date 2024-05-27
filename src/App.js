import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { Button, Dropdown, TextField } from "monday-ui-react-core";
import axios from "axios";

const handleStartOrderOnClick = () => { console.log('clicked!') };

const App = () => {
  const [fragranceOptions, setFragranceOptions] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});

  const onFragranceSelect = (fragrance) => {
    setCurrentOrder((currentOrder) => {
      console.log(`Adding ${fragrance.label} to order`);
      return {
        ...currentOrder,
        [fragrance.label]: fragrance.value,
      };
    });
  };

  const onFragranceRemove = (fragrance) => {
    setCurrentOrder((currentOrder) => {
      console.log(`Removing ${fragrance.label} from order`);
      const clone = Object.assign({}, currentOrder);
      delete clone[fragrance.label];
      return clone;
    });
  };

  const onFragranceClear = () => {
    setCurrentOrder({});
    console.log('Order cleared!');
  };

  const fetchAllFragrances = async () => {
    try {
      const results = await axios.get('http://localhost:8080/api/fragrances');
      if (results.data) {
        setFragranceOptions(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatFragranceOptions = () => {
    if (fragranceOptions.length < 1) return [];
    let count = 1;
    return fragranceOptions.map((fragrance) => {
      return {
        label: fragrance.name,
        value: count++,
      };
    });
  }

  useEffect(() => {
    fetchAllFragrances();
  }, []);

  // (naive) form validation methods
  const StartOrderButton = () => {
    return Object.keys(currentOrder).length !== 3
      ? <Button disabled>Start order</Button>
      : <Button onClick={handleStartOrderOnClick}>Start order</Button>;
  };

  const OrderCountValidationHeader = () => {
    const count = Object.keys(currentOrder).length;
    return count === 0 || count === 3
      ? null
      : <p>Please select exactly 3 fragrances.</p>;
  };

  return (
    <div className="App">
      <div id="form-wrapper">
        <div id="inputs">
          <TextField title="First Name" placeholder="Enter Customer First Name" type="text" size="large" requiredAsterisk>
            Insert your input here.
          </TextField>
          <TextField title="Last Name" placeholder="Enter Customer Last Name" type="text" size="large" requiredAsterisk>
            Insert your input here.
          </TextField>
          <TextField title="Quantity" placeholder="1" type="number" size="large" requiredAsterisk>
            Insert your input here.
          </TextField>
        </div>
        <OrderCountValidationHeader></OrderCountValidationHeader>
        <div id="dropdown">
          <Dropdown
            multi
            clearable
            size="large"
            dropdownMenuWrapperClassName="dropdown-menu-list"
            onOptionSelect={(option) => onFragranceSelect(option)}
            onOptionRemove={(option) => onFragranceRemove(option)}
            onClear={() => onFragranceClear()}
            options={formatFragranceOptions()}
          >
          </Dropdown>
        </div>
        <div id="startOrderButton" size="large">
          <StartOrderButton></StartOrderButton>
        </div>
      </div>
    </div>
  );
};

export default App;
