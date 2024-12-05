export const generateInvoiceTable = function (doc, invoice) {
    let i,
        invoiceTableTop = 420;

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.product.name,
            (item.product.price / item.qty).toFixed(2) + " €",
            item.qty,
            (item.product.price.toFixed(2)) + " €",
        );
    }
}

function generateTableRow(doc, y, c1, c3, c4, c5) {
    doc.fontSize(10)
        .text(c1, 50, y)
        .text(c3, 280, y, { width: 90, align: 'right' })
        .text(c4, 370, y, { width: 90, align: 'right' })
        .text(c5, 0, y, { align: 'right' });
}