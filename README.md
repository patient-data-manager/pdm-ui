# Health Data Manager - User Interface

## About

This project is the frontend for the Health Data Manager.

## Quick Start

### System Requirements
 - Yarn, v1.7.0 or higher
 - Instance of the [hdm-backend](https://github.com/health-data-manager/hdm-backend) server up and running

### Installation
```
yarn install
```

### Usage
To start the server and launch a browser window:
```
yarn start
```

To execute the test suite:
```
yarn test
```

### Configuration Options
The HDM UI uses environment variables to set various configuration options. These variables may be set using conventional OS environment variables, or using a `.env` file 

Using environment variables in \*nix:
```
PORT=8080 yarn start
```
or 
```
export PORT=8080
yarn start
```

Using environment variables in Windows:
```
set REACT_APP_BACKEND_URL=http://127.0.0.1:9090
yarn start
```

Sample `.env` file:
```
REACT_APP_BACKEND_URL=http://192.168.0.100:3000
PORT=8000
```


#### Available Options:
 - `REACT_APP_BACKEND_URL` -- Set this to the base URL (protocol, hostname, and port) for the backend server. If not specified, the server is assumed to be running at `http://127.0.0.1:3000`
 - `REACT_APP_WEBSOCKET_URL` -- Set this to be the base URL (protocol, hostname, and port) for the backend websocket enpoint. If not specified, the endpoint is assumed to be running at `ws://127.0.0.1:3000/cable`
 - `PORT` -- The port the UI server runs on. If not specified the server runs on port 3000.


Note: This project was built with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the CRA guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


# License
Copyright 2018 The MITRE Corporation 
