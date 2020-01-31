# CTEC3905 Assignment

This is very basic boilerplate code for you to get started with.

## index.html

The `index.html` file includes a basic template with a link to the `css/styles.css` file and a script tag after the main content which links to the `js/scripts.js` file.

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>P-Number</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  
  <h1>Hello World</h1>

  <script src="js/scripts.js"></script>
</body>
</html>
```

## css/styles.css

The `css/styles.css` file contains a basic starting template for a responsive page.

```
/* MOBILE AND GLOBAL STYLES */

/* applies to screens smaller than 500px (first breakpoint) */
/* and above unless overwritten below */

body {
  background: #fcc;
} 



/* TABLET STYLES */

@media screen and (min-width: 500px) {

  /* applies to screens wider than 499px */
  
  body {
    background: #cfc;
  } 
}



/* DESKTOP STYLES */

@media screen and (min-width: 1000px) {

  /* applies to screens wider than 999px */

  body {
    background: #ccf;
  } 
}

```

## js/scripts.js

The `js/scripts.js` file contains a simple console.log statement to confirm that it is being executed.

```
console.log("hello");
```
