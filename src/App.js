import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { Button, Dropdown, TextField } from "monday-ui-react-core";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const handleStartOrderOnClick = () => { console.log('clicked!') };

const App = () => {
  const [context, setContext] = useState();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
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
            onOptionSelect={(opt) => {console.log(opt)}}
            onOptionRemove={(opt) => {console.log(opt)}}
            onClear={() => { console.log('options cleared') }}
            options={[
              {
                label: 'Option 1',
                value: 1
              },
              {
                label: 'Option 2',
                value: 2
              },
              {
                label: 'Option 3',
                value: 3
              },
              {
                label: 'Option 4',
                value: 4
              },
              {
                label: 'Option 5',
                value: 5
              },
              {
                label: 'Option 6',
                value: 6
              }
            ]}></Dropdown>
        </div>
        <div id="startOrderButton" size="large">
          <Button onClick={handleStartOrderOnClick}>
            Start Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
