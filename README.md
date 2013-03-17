Visualization Starter Project
============

This project includes starter code for a basic PHP-based web site.
Includes code for connecting to a MySQL database, getting data, and displaying it on the page.
There is also a bit of CSS and JavaScript to get started with.

In general, there are tons of great examples of how to do everything you want to do.
If you are wondering "how do I do ..." just Google it. StackOverflow.com, in
particular, is a great resource for anything related to web development.

Below is a description of each of the components included in this starter package.
This might be useful as you start experimenting with the various technologies at play
and learning how they fit together.

## Generating HTML with PHP

`index.php` is the file that serves the main HTML page.
You can run database queries from here and customize how your data is transformed into HTML elements.
This is also where you load other resources like scripts and stylesheets.

When a user accesses your website, the web server uses a PHP interpreter
to process your PHP file and generate the output it will send to the user's browser.

Your PHP file is processed in a single pass by the interpreter. By default, the
interpreter just spits whatever is in your PHP file out to the browser unmodified.

For example, the interpreter would process the following file and return it to the browser just as it is:
```php
//example index.php without any PHP
<html>
    <head></head>
    <body>
        <h1>Hello world!</h1>
    </body>
</html>
```

For plain HTML files like this, it makes little sense to run it through the PHP interpreter.
However, PHP programming code can be injected into these HTML files using PHP tags:

```
<html>
    <head></head>
    <body>
        <h1><?php echo "Hello world!" ?></h1>
    </body>
</html>
```

PHP code is delimited by `<?php` and `?>`. Some PHP files are pure PHP
(see `include/database.php` for an example). Many are a mix of PHP and HTML, as in index.php.

### More about PHP

- [Official documentation at php.net](http://www.php.net/manual/en/)
- [w3schools.com PHP tutorial](http://www.w3schools.com/php/default.asp)

There are many ins and outs and unexpected eccentricities to PHP.
When you have problems, the following techniques are great to know about:
- add print statements to your code to find out what is going on, with [echo](http://php.net/manual/en/function.echo.php).
- use [var_dump()](http://php.net/manual/en/function.var-dump.php) to examine arrays and objects.
- make sure error reporting is enabled with this line: `error_reporting(E_ALL);`
- set up a proper debugger, such as [Xdebug](http://xdebug.org/), but this is not easy.

## Database access

A utility `Database` class is defined in `include/database.php`.

In your main PHP code, provide connection parameters to the Database constructor to connect to the database.
You can then run any select query you like against the database you have selected.

```php
$db = new Database($host, $user, $password, $schema);
$data = $db->query("SELECT user_id, COUNT(*) as count
                    FROM tweets
                    GROUP BY user_id
                    ORDER BY count DESC
                    LIMIT 100");
```

### More about SQL

To learn more about SQL and accessing it via PHP, check these resources:
- [MySQL Manual](http://dev.mysql.com/doc/refman/5.5/en/index.html)
- [w3schools.com PHP MySQL tutorial](http://www.w3schools.com/php/php_mysql_intro.asp)
- [PHP Mysqli Documentation](http://php.net/manual/en/class.mysqli.php).

It is often helpful to prototype queries in an interactive tool rather than
by changing your source code. For MySQL, [MySQL Workbench](http://dev.mysql.com/downloads/workbench/)
is a pretty decent tool.

When there is a problem with a query, PHP will usually print out the error unless
errors/warnings are disabled. You can display MySQL errors manually using this code:

```php
printf("Error: %s\n", $this->db->error);
```

## CSS

While HTML defines the structure of your document, Cascading Style Sheets
alter the layout and visual properties of your elements.

The `css/main.css` files defines an example rule that sets a few properties. You can add your own rules to this file. To load the style sheet into your page, add this to your HTML head element:

```html
<link rel="stylesheet" href="css/main.css"/>
```

### More about CSS

For documentation about how to use CSS:
- [w3schools.com CSS reference](http://www.w3schools.com/cssref/default.asp)
- [Mozilla Developer Network CSS reference](https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference)

When you have CSS problems (styles not working, not being applied, or whatever),
the most powerful tool you have is the Chrome Developer Tools. Specifically, the Elements view.

Right-click on a mis-behaving element on your page and choose "Inspect Element".
This will open the Elements view of the Chrome Developer Tools, allowing you to
browse the DOM tree and, importantly, view the CSS styles that are currently being
applied to each element. This tool is worth learning how to use.


## JavaScript

JavaScript is used to add interactive features and client-side computation to your
web page. You can program in pure JavaScript, but that will make your life harder.

The starter project includes `js/jquery.js`, which is the latest version of [jQuery](http://jquery.com/), a JavaScript library used all over the web. jQuery's functionality is encapsulated inside
the jQuery object, referenced as `jQuery` or more often `$`. jQuery has many,
many features, but these are some important ones:

```javascript
//Use jQuery.get() to make asyncronous requests to the server:
var request = $.get('some/url');
request.done(function(result) {
    //Print the result
    console.log(result);
});

//Use jQuery as a function to "select" HTML elements, such as <div id="content">
var myElement = $('#content');

//Elements selected with jQuery expose many other functions
myElement.css('display', 'block');

//Attach event handlers to elements
myElement.on('click', function() {
    //do something...
});
```

The starter projet also includes `js/main.js` with a bit of JavaScript that uses
jQuery. Add these two files to your page with the following:

```html
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/main.js"></script>
```

### More about JavaScript and jQuery

- [the jQuery documentation](http://api.jquery.com/)
- [the Mozilla Developer Network JS section](https://developer.mozilla.org/en-US/docs/JavaScript)

jQuery is a very powerful library and with it you can probably do 90% of what you need
to create interactive data-oriented web pages.

When you have problems with JavaScript, there are a few things you can do:
- use `alert(...)` statements to cause a pop-up to display output. This is limited but very simple.
- use `console.log(...)` statements to send output to the Console view of the Chrome Developer Tools.
- use the Chrome Developer Tools "Sources" view for a full featured JavaScript debugger. You can set breakpoints and step through your running program.

## Authors

Created by [Michael Brooks](http://github.com/michaelbrooks).
