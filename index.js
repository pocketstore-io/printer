const fs = require('fs');
const PDFDocument = require('pdfkit');

const invoice = {
    shipping: {
        name: 'John Doe',
        address: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: 94111,
    },
    items: [
        {
            item: 'TC 100',
            description: 'Toner Cartridge',
            quantity: 2,
            amount: 6000,
        },
        {
            item: 'USB_EXT',
            description: 'USB Cable Extender',
            quantity: 1,
            amount: 2000,
        },
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
};
function generateHeader(doc) {
    doc.image('public/logo.png', 50, 45, { width: 200 })
    	.fillColor('#444444')
    	.fontSize(20)
    	.text('NerdyThings.shop', 50, 50,{ align: 'right' })
    	.fontSize(10)
    	.text('Othestrasse 2', 220, 80, { align: 'right' })
    	.text('51702 Bergneustadt', 220, 100, { align: 'right' })
    	.moveDown();
}

function generateFooter(doc) {
    doc.fontSize(
        10,
    ).text(
        'Payment is due within 15 days. Thank you for your business.',
        50,
        780,
        { align: 'center', width: 500 },
    );
}

function generateHr(doc, y, color) {
    doc
        .strokeColor("#"+color) // Farbe der Linie
        .lineWidth(1)           // Breite der Linie
        .moveTo(50, y)          // Startpunkt der Linie (x, y)
        .lineTo(550, y)         // Endpunkt der Linie (x, y)
        .stroke();              // Linie zeichnen
}

function generateCustomerInformation(doc, invoice) {
    const customerInformationTop = 200;

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Rechnung #"+invoice.invoice_nr , 50, 160)

    doc
        .fontSize(10)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(new Date().toLocaleDateString(), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text((invoice.subtotal - invoice.paid).toFixed(2) + " €", 150, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text("Versandadresse:", 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.shipping.address, 300, customerInformationTop + 15)
        .text(`${invoice.shipping.city}, ${invoice.shipping.state}, ${invoice.shipping.country}`, 300, customerInformationTop + 30)
        .moveDown();
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc.fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(c3, 280, y, { width: 90, align: 'right' })
        .text(c4, 370, y, { width: 90, align: 'right' })
        .text(c5, 0, y, { align: 'right' });
}

function generateInvoiceTable(doc, invoice) {
    let i,
        invoiceTableTop = 420;

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            item.description,
            (item.amount / item.quantity).toFixed(2) + " €",
            item.quantity,
            (item.amount.toFixed(2)) + " €",
        );
    }
}

function createInvoice(invoice, path) {
    const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        size: 'A4',
        layout: 'portrait' // 'portrait' or 'landscape'
    });

    generateHeader(doc); // Invoke `generateHeader` function.
    generateHr(doc, 260, "000000")
    generateHeadline(doc, 375)
    generateHr(doc, 260, "1f6fed")
    generatePaymentAndShipping(doc)
    generateHr(doc, 335, "1f6fed")
    generateTableHeader(doc,400, "000000")
    generateCustomerInformation(doc, invoice)
    generateInvoiceTable(doc, invoice)
    generateFooter(doc); // Invoke `generateFooter` function.

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generatePaymentAndShipping(doc){
     // Set some basic styles
     const pageWidth = doc.page.width;
     const margin = 50;
     const columnWidth = (pageWidth - 2 * margin) / 2;
 
     // Draw the delivery section
     doc.fontSize(14).font('Helvetica-Bold')
     .text('Delivery Information', margin, 265, {
         width: columnWidth,
         align: 'left',
     });

     doc
         .font('Helvetica')
         .fontSize(10)
         .text(`Delivery Method: DHL`, margin, 285, {
             width: columnWidth,
             align: 'left',
         });


      // Add PayPal logo
      const dhlLogoPath = 'public/paypal-logo.png'; // Replace with the path to your PayPal logo
      const dhlLogoSize = 110;
     doc.image(dhlLogoPath, margin, 300, { width: dhlLogoSize });
     // Draw the payment section
     doc
         .fontSize(14)
         .font('Helvetica-Bold')
         .text('Payment Information', margin + columnWidth, 265, {
             width: columnWidth,
             align: 'left',
         });
 
     doc
         .font('Helvetica')
         .fontSize(10)
         .text(`Payment Method: PayPal`, margin + columnWidth, 285, {
             width: columnWidth,
             align: 'left',
         });
 
     // Add PayPal logo
     const paypalLogoPath = 'public/paypal-logo.png'; // Replace with the path to your PayPal logo
     const logoSize = 110;
     doc.image(paypalLogoPath, margin + columnWidth, 300, { width: logoSize });
}

function generateHeadline( doc, y) {
    doc
        .fillColor("#000")
        .fontSize(14)
        .text("Warenkorb", 50, y)
}

function generateTableHeader(doc, y) {
    const headers = ["Produkt", "Beschreibung", "Preis pro", "Anzahl", "Gesamt €"];
    const positions = [50, 150, 300, 400, 500]; // X-Positionen für jede Spalte
  
    doc.font("Helvetica-Bold").fontSize(10); // Schriftart und Größe setzen
  
    headers.forEach((header, i) => {
      doc.text(header, positions[i], y, { width: 100, align: "left" }); // Text platzieren
    });
  
    // Optional: Eine Linie unterhalb der Überschrift zeichnen
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y + 15) // Startpunkt der Linie
      .lineTo(550, y + 15) // Endpunkt der Linie
      .stroke();
  }
import config from '../storefront/pocketstore.json';
  const url = 'https://'+config.domain;
  const pb = new PocketBase(url);

  