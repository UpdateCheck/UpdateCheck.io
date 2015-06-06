<!doctype html>
<html lang="en" ng-app="app">
    <head>
        <meta charset="UTF-8">
        <title>UpdateCheck.io</title>
        <base href="/">

        <link href="/builds/vendor.css" rel="stylesheet">
        <link href="/builds/app.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
    </head>
    <body>
        <ng-include src="'templates/layout/header.html'"></ng-include>

        <main ui-view>

        </main>

        <script src="/builds/vendor.js"></script>
        <script src="/builds/app.js"></script>
        <script src="/builds/templates.js"></script>
    </body>
</html>