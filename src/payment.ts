export const generatePaymentAndShipping = function (doc){
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