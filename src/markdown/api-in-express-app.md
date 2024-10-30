# API in Express App

[https://github.com/shawnanuptra/task2](https://github.com/shawnanuptra/task2)

This project is about making an API to access a local data. The API works within a Node.js application wrapped in Express. An automatic API doc was also used using auto-generated documentation by APIDOC (apidocjs.com)

<iframe src="https://www.youtube.com/embed/VAVmIMOsLzk" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Setting Up Express

Using the official Express documentation, getting the server setup is straightforward. Simply create a new directory, execute **_npm init_**, and follow the instructions on the terminal. In this project, the entry point will be **_index.js_**, and we will create the API itself in a different file, by creating **_api.js_**.

In the directory, install Express by running **_npm install express._** After it finishes installing, we will start setting up **_api.js_** and the entry point of the app, **_index.js_**.

The database that we can access is called **_assetsDB.db,_** an SQLite database. We have to put it inside the **/src** directory. To access the SQLite database, we need to install a module to interact with the database by **_npm install sqlite3._**

**_Multer_** will also be used as _middleware,_ and we install the module by **_npm install multer_**.

## Setting Up the API

In **_index.js_**,

```jsx
const app = require("./api");

//listening at port 3000: access through web browser
app.listen(3000);
console.log("App up and running at port 3000");
```

In **_api.js_**,

First, we initiate the Express app, sqlite3, and Multer

```jsx
const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./assetsDB.db");

const multer = require("multer");
const upload = multer();
```

And for **app** module to be able to imported in **_index.js_**, it needs to be exported.

```jsx
module.exports = app;
```

## API Endpoints

Express offers CRUD (Create, Read, Update, and Delete) operations using 4 keywords:

1. **post** for create
2. **get** for read
3. **put** for update
4. **delete** for delete

Building API endpoints is basically exposing these CRUD operations to users, so they can use the database to their liking without risking the data in the database. In other words, making CRUD operations cleaner and simpler.

For example, to get all the data from the assets, we can create an endpoint ‘/assets’

```jsx
app.get("/assets", (req, res) => {
	db.all("select * from assets", (err, rows) => {
		//prints error, if err is not null
		err && console.log(err.message);

		//show results, or message if there are none
		rows ? res.jsonp(rows) : res.send("No assets registered");
	});
});
```

When accessing this endpoint, it will show all the assets in a JSON format, or ‘No assets registered’ when there are no assets in the database.

We are also able to use parameters, for example to search a specific asset using its id.

```jsx
app.get("/assets/:id", (req, res) => {
	const id = req.params.id;
	db.get(`select * from assets where id = ${id}`, (err, rows) => {
		//prints error, if err is not null
		err && console.log(err.message);

		//show results, or message if there are none
		rows ? res.jsonp(rows) : res.send("No assets with specified id");
	});
});
```

To add a new asset to the database, we use the **post** function.

```jsx
app.post("/add", upload.array(), (req, res) => {
	//get from POST form fields
	const type = req.body.type;
	const location = req.body.location;

	db.run("insert into assets (type, location) values (?, ?)", type, location, (error) => {
		if (error) {
			console.log(error);
			res.status(500);
		} else {
			res.status(201);
		}
		res.end();
	});
});
```

This is the same with using **put** for updating a specific asset, and **delete** to delete a specific asset.

```jsx
// update specific id
app.put("/assets/:id", upload.array(), (req, res) => {
	const id = req.params.id;
	//get from POST form fields
	const type = req.body.type;
	const location = req.body.location;

	db.run("update assets set type=?, location=? where id=?", type, location, id, (error) => {
		if (error) {
			console.log(error);
			res.status(500);
		} else {
			res.status(200);
		}
		res.end();
	});
});

// delete specific id
app.delete("/assets/:id", function (req, res) {
	const id = req.params.id;

	db.run("DELETE from assets WHERE id=?", id, (error) => {
		if (error) {
			console.err(error);
			res.status(500); //error
		} else {
			res.status(204); //deleted
		}
		res.end();
	});
});
```

This Express app will also contain an API for a search function. This will made of a switch case with redirects based on the parameters of the endpoint.

```jsx
app.get("/search", (req, res) => {
	//get the type and location params
	const type = req.query.type || null;
	const location = req.query.location || null;

	//logic based on type and location params
	switch (true) {
		//if type and location is not null
		case type !== null && location !== null:
			db.all(
				`select * from assets where upper(type) like upper('%${type}%') AND upper(location) like upper('%${location}%')`,
				(err, rows) => {
					//show results, or message if there are none
					rows ? res.jsonp(rows) : res.send("No assets with specified queries");
				},
			);
			break;

		//if type is not null, but location is
		case type !== null && location === null:
			//redirect to /type/:type
			res.redirect(`../type/${type}`);

			break;

		//if type is null, but location is not null
		case type === null && location !== null:
			//redirect to /location/:location
			res.redirect(`../location/${location}`);
			break;

		//if both queries are null
		case type === null && location === null:
			//redirect to /assets (show all)
			res.redirect("../assets");
			break;

		default:
			res.send("No results");
			break;
	}
});
```

## Auto-generated documentation with API Doc

Documentation is essential to make any tool more accessible and usable. With API Doc, we can have an auto-generated documentation page for our API, simply by commenting on the code. Not only will it make the API code more readable (and more maintainable), it will also make the adoption of the API quicker, as users can refer to the documentation to see endpoints, responses, etc.

First, let’s setup the API Doc itself.

```jsx
// install apidoc
npm install apidoc -g

// state that input is /src, making a new dir as output /apidoc
apidoc -i src -o apidoc
```

A new directory will appear /apidoc, and we don’t need to change any of this for a default output of the API documentation. Next, we need to setup **_apidoc.json_** and add the documentation itself by commenting in **_index.js_**.

**_apidoc.json_** is a configuration document. For this project, I configured it as below

```jsx
{
	"name": "Inventory API Docs",
	"version": "1.0.0",
	"description": "Official documentation of the Inventory API. Built with Node and Express",
	"template": {
		"forceLanguage": "en"
	}
}
```

The settings I configured can be seen at [https://apidocjs.com/#getting-started](https://apidocjs.com/#getting-started).

Using the [apidocjs.com](http://apidocjs.com) documentation, I created documentation for each endpoint I created. An example for **_/assets_** endpoint:

```jsx
/**
 * @api {get} /assets Displays in JSON all available assets
 * @apiVersion 1.0.0
 * @apiName GetAllAssets
 * @apiGroup Inventory
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "type": "printer",
 *      "location": "St Peters"
 *    },
 *      {
 *      "id": 2,
 *      "type": "phone",
 *      "location": "CitySpace"
 *      }]
 * @apiErrorExample {json} List error
 *   HTTP/1.1 500 Internal Server Error
 */
app.get("/assets", (req, res) => {
	db.all("select * from assets", (err, rows) => {
		//prints error, if err is not null
		err && console.log(err.message);

		//show results, or message if there are none
		rows ? res.jsonp(rows) : res.send("No assets registered");
	});
});
```

Opening the /apidoc/index.html will be output this

![Untitled](/api-in-express-app/Untitled.png)

## Testing with Supertest and Jest

Before publishing any code, testing is a must. I tested my API with the Supertest library and Jest as the testing framework.

Install the Supertest and Jest framework as development dependency, as it is unneeded in production.

```jsx
npm i supertest jest --save-dev
```

Add a new script to the **_package.json_** file.

```jsx
"scripts": {
	"test": "jest"
},
```

Create **_test.js_** file. This will be where all the testing code will be run.

```jsx
// declarations
const app = require("./api.js");
const supertest = require("supertest");
const request = supertest(app);
```

Finally, test each endpoint! An example:

```jsx
//6. testing PUT /assets/:id
describe('PUT /assets/1', () => {
    it('sends a 200 success code', (done) => {
        request
            .put('/assets/1')
            .field('type', 'monitor')
            .field('location', 'CitySpace')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    })
```
