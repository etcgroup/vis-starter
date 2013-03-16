Visualization Starter Project
============

This project includes starter code for a basic PHP-based web site.
Includes code for connecting to a MySQL database, getting data, and displaying it on the page.

## index.php

The file that serves the main HTML page. Customize this to change how your data is transformed into HTML elements. This is also where you load other resources like scripts and stylesheets.

## include/database.php

Defines the `Database` class. You must use `include` in your main PHP file to load it:

```php
include 'include/database.php';
```

Provide connection parameters to the constructor to connect to the database.
The `count_tweets_by_user()` method shows how to run a query and get results.

```php
$db = new Database($host, $user, $password, $schema);
$data = $db->count_tweets_by_user();
```

## js/jquery.js

The latest version of [jQuery](http://jquery.com/).

When you want to use it, just add this to your HTML:

```html
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('body').append('jQuery is running!');
    });
</script>
```

## css/styles.css

A starter css file. You can add your own rules to this as you build out your site.

When you are ready to add it to your page, add this to your HTML head element:

```html
<link rel="stylesheet" href="css/main.css"/>
```

## Authors

Created by [Michael Brooks](http://github.com/michaelbrooks).
