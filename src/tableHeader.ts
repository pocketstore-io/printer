export let generateTableHeader = function (doc, y,color) {
    const headers = ["Produkt", "Preis pro", "Anzahl", "Gesamt €"];
    const positions = [50, 300, 400, 500]; // X-Positionen für jede Spalte

    doc.font("Helvetica-Bold").fontSize(10); // Schriftart und Größe setzen

    headers.forEach((header, i) => {
        doc.text(header, positions[i], y, { width: 100, align: "left" }); // Text platzieren
    });

    // Optional: Eine Linie unterhalb der Überschrift zeichnen
    doc
        .strokeColor(color)
        .lineWidth(1)
        .moveTo(50, y + 15) // Startpunkt der Linie
        .lineTo(550, y + 15) // Endpunkt der Linie
        .stroke();
}