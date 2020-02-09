const shoppinglists_view = ((data) => {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/style2.css">
    <meta charset="UTF-8">
    </head>
    <body>


    <div class="div_tervetuloa">
              Tervetuloa, <a href="/user-info">${data.user_name}</a>
            </div>
            <div class="ylapalkki">
            <div class="div_logout"><form action="/logout" method="POST">
            <button class="logoutbtn" type="submit">Kirjaudu ulos</button>
            </form></div>
            </div> 
            <h2>Kauppalistat</h2>
    `;


    data.shoppinglist.forEach((shoppinglist) => {
        html += `<div class="noteline"><div class="note">`;
        html += shoppinglist.text;
        html += `
            </div>
            <div class="deletebutton">
            <form action="delete-note" method="POST">
                <input type="hidden" name="note_id" value="${shoppinglist._id}">
                <button type="submit">Poista kauppalista</button>
            </form>
            </div>
            </div>
            `;
    });

    html += `
        <form action="/add-shoppinglist" method="POST">
            <input type="text" name="shoppinglist">
            <button type="submit">Lisää uusi kauppalista</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const shoppinglist_view = (data) => {
    let html = `
    <html>
    <body>
        Shoppinglist text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.shoppinglist_view = shoppinglist_view;
module.exports.shoppinglists_view = shoppinglists_view;
