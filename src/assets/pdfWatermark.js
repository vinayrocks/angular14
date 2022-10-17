async function modifyPdf(filePath, PDFDocument, StandardFonts, rgb) {

    // Fetch an existing PDF document
    const url = filePath;
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Get the first page of the document
    const pages = pdfDoc.getPages();

    // Get the width and height of the first page


    pages.forEach(element => {
        const { width, height } = element.getSize()
        // Draw a string of text diagonally across the first page
        element.drawText('HUNAR', {
            x: width / 3,
            y: height / 2,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1)
        })
    });


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    // Trigger the browser to download the PDF document
    download(pdfBytes, generateId(), "application/pdf");
}

// generateId :: Integer -> String
function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0")
}