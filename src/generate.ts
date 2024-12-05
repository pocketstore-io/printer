import { generateHeadline } from './headline';
import { generateTableHeader } from './tableHeader';
import { generatePaymentAndShipping } from './payment';
import { generateInvoiceTable } from './table';
import { generateCustomerInformation } from './customer';
import { generateHr } from './hr';

import PDFDocument from 'pdfkit';
import fs from 'fs';
import { generateFooter } from './footer';
import { generateHeader } from './header';

let invoice = {
    shipping: {
        name: 'John Doe',
        address: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: 94111,
    },
    items: [],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
};

export const createInvoice = function (order, path) {
    const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        size: 'A4',
        layout: 'portrait' // 'portrait' or 'landscape'
    });

    invoice.invoice_nr = order.id;
    invoice.items = order.cart;
    console.log(order.cart);

    generateHeader(doc); // Invoke `generateHeader` function.
    generateHr(doc, 260, "000000")
    generateHeadline(doc, 375)
    generateHr(doc, 260, "1f6fed")
    generatePaymentAndShipping(doc)
    generateHr(doc, 335, "1f6fed")
    generateTableHeader(doc, 400, "000000")
    generateCustomerInformation(doc, invoice)
    generateInvoiceTable(doc, invoice)
    generateFooter(doc);
    doc.file('documents/zugpferd.xml')
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}