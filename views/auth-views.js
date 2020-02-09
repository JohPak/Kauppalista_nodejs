const login_view = () => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <meta charset="UTF-8">
    </head>
    <body>

    <div class="loota">
      <h1>Kauppalista</h1>
        <form action="/login" method="POST">
            <div class="rivi">
              <input type="text" name="user_name" autofocus>
            </div>
            <div class="rivi">
              <button type="submit">Kirjaudu sisään</button>
            </div>
        </form>
        <form action="/register" method="POST">
        <div class="rivi">
        <input type="text" name="user_name">
            </div>
            <div class="rivi">
              <button type="submit">Rekisteröidy</button>
              
            </div>
        </form>
    </div>
    </body>
    <html>

    
    <!--<html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
    </body>
    <html>-->
    `;

    return html;
}

module.exports.login_view = login_view;