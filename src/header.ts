export const generateHeader = function (doc) {
    doc.image('public/logo.png', 50, 45, { width: 200 })
    	.fillColor('#444444')
    	.fontSize(20)
    	.text('NerdyThings.shop', 50, 50,{ align: 'right' })
    	.fontSize(10)
    	.text('Othestrasse 2', 220, 80, { align: 'right' })
    	.text('51702 Bergneustadt', 220, 100, { align: 'right' })
    	.moveDown();
}