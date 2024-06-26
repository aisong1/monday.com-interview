## Overview
This app allows consumers to place candle orders. These orders are added to an Orders board in Monday.com upon placement.

## Run the project

### Pre-requesites
This project requires MYSQL to be installed locally. You can either
1. Use [homebrew](https://formulae.brew.sh/formula/mysql) (recommended), or
2. Install the MYSQL package [directly onto your system](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)

Once installed, a user of name "root" will be automatically created, without a password. Leave it without a password.

As a sanity check, start up your MYSQL server.
``` sh
### homebrew
brew services start mysql

### Direct system install
mysql.server start
```

After you confirm that MYSQL is installed successfully, create the `fragrances` table by running
``` sh
mysql -u root < server/db/schema.sql
```
If successful, you should see no output from the terminal.

### Install project dependencies
Install all project dependencies with
``` sh
npm install
```

### Configure environment variables
Export the following **required** environment variables.

``` sh
export AUTH_TOKEN=MONDAY.COM_API_TOKEN; # Your Monday.com developer auth token
export BOARD_ID=TARGET_BOARD_ID;        # The ID of the target Orders board
export DROPDOWN_ID=TARGET_DROPDOWN_ID;  # The column ID of the dropdown menu where fragrances will be listed per order
```

### Starting the backend server
This app runs a simple Express server for its backend. Start the server with
``` sh
npm run backend
```
A local server will now be running at `http://localhost:8080`.

### Running the app
With the backend server running, start up the app by running
``` sh
npm start
```
This command will run the app in two places: on Monday.com servers & on your localhost.
View the app by navigating to the Monday.com URL displayed in the terminal or by navigating to `http://localhost:8301`.

Enter your first name, last name, the amount of candle boxes you'd like to order, and select exactly three fragrances. Hit "Start order" to place an order and watch it appear on your Orders board! 🎉

## `/api/fragrance`
Copy and paste the following cURL commands directly into terminal or into Postman to test the fragrance API.

### Create a fragrance (POST)
Creates a fragrance. Required fields:
- Name
- Description
- Category
- Image URL

``` sh
curl --location 'localhost:8080/api/fragrances' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Fresh Laundry",
    "description": "For that classic Downey scent.",
    "category": "Fresh",
    "image_url": "https://example.com/fresh_laundry.jpg"
}'
```

### Get all fragrances (GET)
Fetches a list of all fragrances. Response includes fragrance IDs.
``` sh
curl --location 'localhost:8080/api/fragrances'
```
_A fragrance **must** be referenced by its ID when performing update and delete operations._


### Update a fragrance (PUT)
Updates details for a single fragrance. Request body can contain any number of valid, existing columns to update.
``` sh
curl --location --request PUT 'localhost:8080/api/fragrances?id=<FRAGRANCE_ID>' \
--header 'Content-Type: application/json' \
--data '{
   "description": "foo",
   "category": "bar"
}'
```

### Delete a fragrance (DELETE)
Deletes a single fragrance.
``` sh
curl --location --request DELETE 'localhost:8080/api/fragrances?id=<FRAGRANCE_ID>'
```