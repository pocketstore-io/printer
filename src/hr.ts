export const generateHr = function (doc, y, color) {
    doc
        .strokeColor("#"+color) // Farbe der Linie
        .lineWidth(1)           // Breite der Linie
        .moveTo(50, y)          // Startpunkt der Linie (x, y)
        .lineTo(550, y)         // Endpunkt der Linie (x, y)
        .stroke();              // Linie zeichnen
}