const notes_view = ((data) => {
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
            <h2>Kauppalistan ${data} tuotteet</h2>
    `;


    data.notes.forEach((note) => {
        html += `<div class="noteline"><div class="note">`;
        html += note.text;
        html += `
            </div>
            <div class="deletebutton">
            <form action="delete-note" method="POST">
                <input type="hidden" name="note_id" value="${note._id}">
                <button type="submit">Poista</button>
            </form>
            </div>
            </div>
            `;
    });

    html += `
        <form action="/add-note" method="POST">
            <input type="text" name="note">
            <button type="submit">Lisää uusi</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const note_view = (data) => {
    let html = `
    <html>
    <body>
        Note text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.notes_view = notes_view;
module.exports.note_view = note_view;