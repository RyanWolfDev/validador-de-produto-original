import { Injectable } from "@angular/core";
import { jsPDF } from "jspdf";
import { Token } from "../../layouts/admin-layout/pages/token/token.model";

@Injectable({
    providedIn: 'root'
})
export class PrintPageSerivce {

    constructor() { }

    print(tokens: Token[]) {

        const qtdTokensPerRow: number = 3;

        let document = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [25, 111]
        });

        tokens.forEach((value, index) => {
            if (index > 0 && !(index % qtdTokensPerRow)) {
                document.addPage()
            }

            if(index % qtdTokensPerRow == 0){
                document.text(value.token, 20, 13, { align: "center" });
            }else if(index % qtdTokensPerRow == 1){
                document.text(value.token, 57, 13, { align: "center" });
            }else{
                document.text(value.token, 91, 13, { align: "center" });
            }
        });

        document.output("dataurlnewwindow");
    }
}
