## Welcome to Node.js QR Code generator

The code in this page repository allows you to automatically generate a QR Code from URLs and Text and viewing it on your screen. You can use the code as a template without further restrictions.

### Project structure

The overall project structure is as shown below:

> QRcode-Generator (Root Directory)
>
> > node_modules (folder)
> >
> > views (folder)
> > > index.ejs (file)
> > > scan.ejs (file)
> >
> > index.js (file)

### Table of contents
- [Setting up our environment](#Setting-up-our-environments)
- [Configure package.json](#Configure-package.json)
- [Starting point](#Starting-point)
- [Adding a views folder](#Adding-a-views-folder)
- [Run the code](#Run-the-code)

### Setting up our environment

Let us do the following:
`npm init -y`

Then followed by this:
```nodejs
npm i qrcode express body-parser nodemon ejs
```

`npm update`

This will auto install our packages and update them if any needed an update.
The packages in use are:

- body-parser
- ejs (Embedded JavaScript templates)
- express
- qrcode
- nodemon

### Configure package.json

Add some nodemon configuration

```json
{
    "name": "QRCODE-URL-main",
    "description": "",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "start": "npm index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "body-parser": "^1.19.0",
        "ejs": "^3.1.6",
        "express": "^4.17.1",
        "nodemon": "^2.0.7",
        "qrcode": "^1.4.4"
    }
}
```

### Starting point

**index.js**

Let's do these:

```javascript
// Calling the packages that we need

const express = require("express");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");

// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

// Blank input
// Incase of blank in the index.ejs file, return error 
// Error  - Empty Data!
app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");

        res.render("scan", { src });
    });
});

// Setting up the port for listening requests
app.listen(port, () => console.log("Server at 5000"));
```
### Adding a views folder
**index.ejs**

```html
<!doctype html>
<html lang="en">

<head>
    <title>QR Code Generator</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Custom CSS -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
        * {
            font-family: Montserrat;
        }
        
        .card {
            margin: 0 auto;
            /* Added */
            float: none;
            /* Added */
            margin-bottom: 10px;
            /* Added */
        }
    </style>
</head>

<body>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <!-- Main Container -->
    <div class="container">
        <br>
        <h1 class="text-center">QR CODE GENERATOR</h1>
        <hr>

        <!-- Input card -->
        <!-- row -->
        <div class="row mb-3">

            <!-- col.// -->
            <aside class="col-sm-12 text-center">
                <p>This is a simple QR Code generator website</p>

                <div class="card">
                    <article class="card-body">
                        <h4 class="card-title text-center mb-4 mt-1">Input</h4>
                        <hr>
                        <p class="text-success text-center">Please paste in or type the URL or Text below and press Generate!</p>
                        <form action="/scan" method="POST">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"> <i class="fa fa-pencil"></i> </span>
                                    </div>
                                    <input name="url" class="form-control" placeholder="URL or Text" type="text" required>
                                </div>
                                <!-- input-group.// -->
                            </div>
                            <!-- form-group// -->

                            <!-- form-group// -->
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block" value="Get QR">Generate</button>
                            </div>
                            <!-- form-group// -->

                            <p class="text-center"><a href="#" class="btn">Find help?</a></p>
                        </form>
                    </article>
                </div>
                <!-- card.// -->

            </aside>
            <!-- col.// -->
        </div>

        <!-- row.// -->
        <!--Image card end.//-->

    </div>
    <!--container end.//-->
</body>

</html>
```

**scan.ejs**

```html
<!doctype html>
<html lang="en">

<head>
    <title>QR Code Generator</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Custom CSS -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
        * {
            font-family: Montserrat;
        }
        
        .card {
            margin: 0 auto;
            /* Added */
            float: none;
            /* Added */
            margin-bottom: 10px;
            /* Added */
        }
    </style>

</head>

<body>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <!-- Main Container -->
    <div class="container">
        <br>
        <h1 class="text-center">QR CODE GENERATOR</h1>
        <hr>

        <!-- Image card -->
        <div class="row mb-3">

            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src=<%=src%> alt="QR Code Image">
                <div class="card-body">
                    <p class="card-text">Scan the QR Code to access data!</p>
                </div>
                <a href="/"><button type="button" class="btn btn-outline-secondary btn-lg">Back</button></a>
            </div>
            <!--Image card end.//-->
        </div>
        <!--container end.//-->
</body>

</html>
```
### Run the code

```nodejs
npm run dev
```

In the browser, access the webpage using the following URL:
 `localhost:5000`



*Author: **FrancisKaguongo***
