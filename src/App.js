import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { Button, Dropdown, TextField } from "monday-ui-react-core";
import axios from "axios";

const ORDER_STATUS = {
  NOT_STARTED: 'Not started',
  SUBMITTED: 'Submitted',
  PLACED: 'Placed',
  INVALID_QUANTITY: 'Invalid quantity',
};

const dropdownMenuOptionHeightPx = 30.5;
const dropdownMenuInnerPadding = 8;
const dropdownMenuOuterMargin = 16;

const App = () => {
  const [fragrances, setFragrances] = useState({});
  const currentOrderRef = useRef([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');

  const [orderStatus, setOrderStatus] = useState(ORDER_STATUS.NOT_STARTED);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const calculateCurrentDropdownMenuHeight = () => {
    // The current height of the dropdown is the total number of fragrances
    // deducted by the number of the fragrances the user currently has selected,
    // multipled by height of each option text, summed with the inner padding 
    // and outer margin height of the dropdown menu element itself.
    const currentDropdownHeight = 
      ((Object.keys(fragrances).length - currentOrderRef.current.length) * dropdownMenuOptionHeightPx) 
        + dropdownMenuInnerPadding + dropdownMenuOuterMargin;

    return currentDropdownHeight;
  }

  // event listeners
  const onFragranceSelect = (fragrance) => {
    console.log(`Adding ${fragrance.label} to order`);
    currentOrderRef.current.push(fragrance.label);
    setDropdownHeight(calculateCurrentDropdownMenuHeight());
  };

  const onFragranceRemove = (fragrance) => {
    console.log(`Removing ${fragrance.label} from order`);
    const index = currentOrderRef.current.findIndex((element) => element === fragrance.label);
    currentOrderRef.current.splice(index, 1);
    setDropdownHeight(calculateCurrentDropdownMenuHeight());
  };

  const onFragranceClear = () => {
    currentOrderRef.current = [];
    console.log('Order cleared!');
  };

  const onOrderQuantityChange = (value) => {
    setOrderQuantity(value);

    if (parseInt(value) < 1) {
      setOrderStatus(ORDER_STATUS.INVALID_QUANTITY);
    } else {
      setOrderStatus(ORDER_STATUS.NOT_STARTED);
    }
  }

  const onMenuOpen = () => {
    setDropdownHeight(calculateCurrentDropdownMenuHeight());
    setIsDropdownOpen(true);
  };

  const onMenuClose = () => {
    setIsDropdownOpen(false);
  };

  // (naive) form stylers/validators
  let size = 'large';
  let disabled, loading, success, successText, onClick, message;

  const isValidOrder = () => {
    return currentOrderRef.current.length === 3
      && firstName !== ''
        && lastName !== ''
          && Number.isInteger(parseInt(orderQuantity));
  };

  const StartOrderButton = () => {
    switch (orderStatus) {
      case ORDER_STATUS.INVALID_QUANTITY:
        disabled = true;
        message = <p id="invalidOrderQuantityMessage">Your order must contain at least one box.</p>
        break;
      case ORDER_STATUS.SUBMITTED:
        loading = true;
        break;
      case ORDER_STATUS.PLACED:
        success = true;
        successText = 'Thank you!';
        message = <p id="orderConfirmationMessage">Your order has been placed.</p>;
        break;
      default:
        if (isValidOrder()) {
          onClick = onStartOrderClick;
        } else {
          disabled = true;
        }
        break;
    }

    return <>
      <span>
        <Button
          disabled={disabled}
          loading={loading}
          success={success}
          successText={successText}
          onClick={onClick}
          size={size}
        >
          Start order
        </Button>{message}
      </span>
    </>;
  };

  const OrderCountValidationHeader = () => {
    const count = currentOrderRef.current.length;
    return count === 0 || count === 3
      ? null
      : <p id="fragranceNumberValidationMessage">Please select exactly 3 fragrances.</p>;
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

  const onStartOrderClick = () => {
    setOrderStatus(ORDER_STATUS.SUBMITTED);

    const order = {
      first_name: firstName,
      last_name: lastName,
      fragrances: currentOrderRef.current,
      orderQuantity,
    };

    axios.post('http://localhost:8080/api/orders', order)
      .then((data) => {
        setOrderStatus(ORDER_STATUS.PLACED);
      })
      .catch((err) => {
        throw err;
      });
  };

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
            size={size}
            requiredAsterisk
            onChange={(value) => {setFirstName(value)}}
          ></TextField>
          <TextField
            title="Last Name"
            placeholder="Enter Customer Last Name"
            type="text"
            size={size}
            requiredAsterisk
            onChange={(value) => {setLastName(value)}}
          ></TextField>
          <TextField
            title="Quantity"
            placeholder="0"
            type="number"
            size={size}
            requiredAsterisk
            onChange={(value) => {onOrderQuantityChange(value)}}
          ></TextField>
        </div>
        <OrderCountValidationHeader></OrderCountValidationHeader>
        <div id="dropdown">
          <Dropdown
            multi
            clearable
            size={size}
            dropdownMenuWrapperClassName="dropdown-menu-list"
            onOptionSelect={(option) => onFragranceSelect(option)}
            onOptionRemove={(option) => onFragranceRemove(option)}
            onClear={() => onFragranceClear()}
            options={formatFragranceOptions()}
            onMenuOpen={() => onMenuOpen()}
            onMenuClose={() => onMenuClose()}
          >
          </Dropdown>
        </div>
        <div id="startOrderButton" style={{ marginTop: isDropdownOpen ? `${dropdownHeight}px` : '1em', transition: 'margin-top 0.3s ease' }}>
          <StartOrderButton></StartOrderButton>
        </div>
      </div>
    </div>
  );
};

export default App;
