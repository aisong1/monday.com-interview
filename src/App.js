import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { Button, Dropdown, TextField } from "monday-ui-react-core";
import axios from "axios";

const ORDER_STATUS = {
  NOT_STARTED: 'Not started',
  SUBMITTED: 'Submitted',
  PLACED: 'Placed',
};

const App = () => {
  const [fragrances, setFragrances] = useState({});
  const [currentOrder, setCurrentOrder] = useState({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(0);

  const [orderStatus, setOrderStatus] = useState(ORDER_STATUS.NOT_STARTED);

  // event listeners
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

  const onStartOrderClick = () => {
    setOrderStatus(ORDER_STATUS.SUBMITTED);
    for (const fragrance of Object.keys(currentOrder)) {
      currentOrder[fragrance] = fragrances[fragrance];
    }
    const order = {
      firstName,
      lastName,
      orderQuantity,
      currentOrder,
    };

    axios.post('', order)
      .then((data) => {
        setOrderStatus(ORDER_STATUS.PLACED);
      })
      .catch((err) => {
        throw err;
      });
  };

  // (naive) form validators
  const StartOrderButton = () => {
    // TODO: refactor to reduce repetition
    if (orderStatus === ORDER_STATUS.SUBMITTED) {
      return <Button loading>Processing...</Button>
    }
    if (orderStatus === ORDER_STATUS.PLACED) {
      return <Button success successText="Your order has been placed!"></Button>
    }
    return Object.keys(currentOrder).length !== 3
      ? <Button disabled>Start order</Button>
      : <Button onClick={onStartOrderClick}>Start order</Button>;
  };

  const OrderCountValidationHeader = () => {
    const count = Object.keys(currentOrder).length;
    return count === 0 || count === 3
      ? null
      : <p>Please select exactly 3 fragrances.</p>;
  };

  // data fetching and formatting
  const fetchAllFragrances = async () => {
    try {
      const results = await axios.get('http://localhost:8080/api/fragrances');
      if (results.data) {
        const temp = {};
        results.data.forEach((fragrance) => {
          temp[fragrance.name] = fragrance;
        });
        setFragrances(temp);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatFragranceOptions = () => {
    if (Object.keys(fragrances).length < 1) return [];

    let count = 1;
    const options = [];
    for (const fragranceName of Object.keys(fragrances)) {
      options.push({
        label: fragranceName,
        value: count++,
      });
    }
    return options;
  }

  useEffect(() => {
    fetchAllFragrances();
  }, []);

  return (
    <div className="App">
      <div id="form-wrapper">
        <div id="inputs">
          <TextField
            title="First Name"
            placeholder="Enter Customer First Name"
            type="text"
            size="large"
            requiredAsterisk
            onChange={(value) => {setFirstName(value)}}
          ></TextField>
          <TextField
            title="Last Name"
            placeholder="Enter Customer Last Name"
            type="text"
            size="large"
            requiredAsterisk
            onChange={(value) => {setLastName(value)}}
          ></TextField>
          <TextField
            title="Quantity"
            placeholder="1"
            type="number"
            size="large"
            requiredAsterisk
            onChange={(value) => {setOrderQuantity(value)}}
          ></TextField>
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
