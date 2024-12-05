export const generateCustomerInformation = function(doc, invoice) {
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
