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
        <header>
            <md-content>
                <md-toolbar>
                    <div class="md-toolbar-tools">
                        <md-icon md-svg-src="/img/logo_clear.svg" alt="Logo"></md-icon>
                        <h2>
                            <span>UpdateCheck.io</span>
                        </h2>
                        <span flex></span>
                        <md-button class="md-icon-button" aria-label="Login">
                            <md-icon md-font-library="material-icons">person</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>
            </md-content>
        </header>


        <main ui-view>

        </main>

        <script src="/builds/vendor.js"></script>
        <script src="/builds/app.js"></script>
        <script src="/builds/templates.js"></script>
    </body>
</html>