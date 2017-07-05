# swatchjs-express

An adapter to expose [swatchjs]() via [Express](https://www.npmjs.com/package/express).

## Quick start

The following exposes the simple API from the `swatchjs`'s README file:

```javascript
const swatch = require('swatchjs');
const swatchExpress = require('swatchjs-express');

const model = swatch({
    "numbers.add": (a, b) => Number(a) + Number(b),
    "numbers.sub": (a, b) => Number(a) - Number(b),
});

const app = express();
swatchExpress(app, model);
```

That's it! No HTTP headers, status codes, or any other distracting verbiage.
Each API method you declared can now be invoked using any of the supported HTTP
verbs.

**Note**:<br/>
It is strongly advised that you only enable your APIs over HTTPS.

## Verbs

### GET

The `GET` binding expects all parameters to be passed in the query string.

For instance, using the popular [`request`](https://www.npmjs.com/package/request)
package, you would invoke the `numbers.add` method above as follows:

```javascript
var request = require('request');

request('https://my-server/numbers.add?a=1&b=2');
```

**Note**:<br/>
Every parameter in the query string is received as, well, a string. So if you
plan on supporting the `GET` verb, it is recommended that either you provide
`parse` functions for each of your arguments, or that you validate and coerce
them inside your function (as shown in the example above).

### POST

The `POST` binding expects parameters to be passed in the `body` property of
Express' request object.

Below is an example of calling the API using an `XMLHttpRequest` object:

```javascript
function post(url, body) {
    var request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(body));

    return request;
}

var request = post(
    'https://my-server/numbers.add',
    {
        a: 1,
        b: 2,
    });
```

**Note**<br/>

Be mindful that how the `body` property of Express' request object gets
populated depends on which body-parsing middleware you have enabled.

If you have a simple JSON body parser, then it will parse `application/json`
content types, and your parameters could potentially have non-string types
(it is still a good idea to verify).

If, on the other hand, you have `application/x-www-form-urlencoded` parsing
enabled, then all parameters will be strings, and the same considerations of the
`GET` verb apply.

There are popular libraries for Express that enable the service to choose their
behavior with regards to body parsing. A popular one is
[`body-parser`](https://www.npmjs.com/package/body-parser).

```javascript
var express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
```

## API reference

### The `swatchExpress` function

```javascript
const swatchExpress = require('swatch-express');

swatchExpress(app, model, options);
```

Loading this library will result in a function  (`swatchExpress` in the
example above) which takes the following parameters:

| Parameter | Required  | Description   |
|:---       |:---       |:---           |
|`app`      | Yes       | The Express app to populate.              |
|`model`    | Yes       | The API model created by `swatchjs`.      |
|`options`  | No        | Additional options when exposing the API. When present, must be an object. |

The `options` object has the following properties:

| Property  | Example   | Default value     | Description   |
|:---       |:---       |:---               |:---           |
|`verbs`    |`['get']`  |`['get','post']`   | An array with a list of HTTP verbs to use. Each verb must be a string, and must be known. |
|`prefix`   |`'api'`    |`''`               | A URL prefix to be added to every route. For example, if the value of this option is `'product'`, then the URL of all APIs will start with `/product/`.   |
