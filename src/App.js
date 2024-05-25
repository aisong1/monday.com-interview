import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { Button, Dropdown, TextField } from "monday-ui-react-core";
import axios from "axios";

const handleStartOrderOnClick = () => { console.log('clicked!') };

const App = () => {
  const [fragranceOptions, setFragranceOptions] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(new Map());

  const onFragranceSelect = (fragrance) => {
    setCurrentOrder((currentOrder) => {
      console.log(`Adding ${fragrance} to order`);
      currentOrder.set(fragrance, 0);
      for (const [k, v] of currentOrder.entries()) {
        console.log(k, v);
      }
      return currentOrder;
    });
  };

  const onFragranceRemove = (fragrance) => {
    setCurrentOrder((currentOrder) => {
      console.log(`Removing ${fragrance} from order`);
      currentOrder.delete(fragrance);
      for (const [k, v] of currentOrder.entries()) {
        console.log(k, v);
      }
      return currentOrder;
    });
  };

  const onFragranceClear = () => {
    setCurrentOrder(new Map());
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

  return (
    <div className="App">
      <div id="form-wrapper">
        <div id="inputs">
          <TextField title="First Name" placeholder="Enter Customer First Name" type="text" size="large">
            Insert your input here.
          </TextField>
          <TextField title="Last Name" placeholder="Enter Customer Last Name" type="text" size="large">
            Insert your input here.
          </TextField>
          <TextField title="Quantity" placeholder="1" type="number" size="large">
            Insert your input here.
          </TextField>
        </div>
        <div id="dropdown">
          <Dropdown 
            multi
            multiline
            clearable
            size="large"
            onOptionSelect={(option) => onFragranceSelect(option)}
            onOptionRemove={(option) => onFragranceRemove(option)}
            onClear={() => onFragranceClear()}
            options={formatFragranceOptions()}></Dropdown>
        </div>
        <div id="startOrderButton" size="large">
          <Button onClick={handleStartOrderOnClick}>
            Start order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
