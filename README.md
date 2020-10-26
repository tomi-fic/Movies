Movie App - FrontEnd Project
=====================

This app is made for movies search with frontend only. There are many libraries used in this project : **React** for DOM visualisation, **Redux** for state management, **redux-thunk** for handling API side effects, **react-router** for SPA approach and many more. Please feel free to fork it and  

Prerequisites
-------------

* [Git](http://git-scm.com/)
* [npm](https://www.npmjs.org/)
* [node](https://nodejs.org/en/)
* [OMDbAPI](http://www.omdbapi.com/)

Get your API KEY
-------------------

* go to http://www.omdbapi.com/apikey.aspx and register for free
* check your emailbox with personal API key
* create **.env** file at root directory - ../Movies/
* append .env file with your API key - REACT_APP_API_KEY = **APIkey** ... example REACT_APP_API_KEY = abcd1234

Installation
------------

Clone the project

```bash
git clone https://github.com/tomi-fic/Movies.git && cd Movies/
```

Install the dependencies

```bash
npm install
```

Start the frontend server

```bash
npm start
```

Frontend App should open in browser at http://localhost:3000




