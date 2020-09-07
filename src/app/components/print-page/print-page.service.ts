import { Injectable } from "@angular/core";
import { jsPDF } from "jspdf";
import { Token } from "../../layouts/admin-layout/pages/token/token.model";
import QRCode from 'qrcode';

@Injectable({
    providedIn: 'root'
})
export class PrintPageSerivce {

    constructor() { }
    print(tokens: Token[]) {

        let PDFdocument = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [25, 111]
        });

        let promises = [];
        const qtdTokensPerRow: number = 3;

        //Text Postion
        const textFirstPositionX = 20;
        const textSecondPositionX = 57;
        const textThirdPositionX = 92;
        const textPositionY = 20;

        //QRCode Img Position
        const imgFirstPositionX = textFirstPositionX - 8;
        const imgSecondPositionX = textSecondPositionX - 8;
        const imgThirdPositionX = textThirdPositionX - 8;
        const imgPositionY = textPositionY - 18;

        //QRCode Image Size
        const qrcodeWidth = 16;
        const qrcodeHeight = 16;

        tokens.forEach((value, index) => {

            PDFdocument.setFontSize(8);

            promises.push(
                QRCode.toDataURL(value.token, {
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: "M"
                }).then(qrcodeBase64 => {

                    if (index > 0 && !(index % qtdTokensPerRow)) {
                        PDFdocument.addPage()
                    }

                    if (index % qtdTokensPerRow == 0) {
                        PDFdocument.addImage(qrcodeBase64, "WEBP", imgFirstPositionX, imgPositionY, qrcodeWidth, qrcodeHeight, null, null);
                        PDFdocument.text(value.token, textFirstPositionX, textPositionY, { align: "center" });
                    } else if (index % qtdTokensPerRow == 1) {
                        PDFdocument.addImage(qrcodeBase64, "WEBP", imgSecondPositionX, imgPositionY, qrcodeWidth, qrcodeHeight, null, null);
                        PDFdocument.text(value.token, textSecondPositionX, textPositionY, { align: "center" });
                    } else {
                        PDFdocument.addImage(qrcodeBase64, "WEBP", imgThirdPositionX, imgPositionY, qrcodeWidth, qrcodeHeight, null, null);
                        PDFdocument.text(value.token, textThirdPositionX, textPositionY, { align: "center" });
                    }
                }).catch((error) => {
                    console.log('Error: ', error);
                })
            )
        });

        Promise.all(promises).then(() =>
            PDFdocument.save("etiquetas.pdf")
        );
    }
}
