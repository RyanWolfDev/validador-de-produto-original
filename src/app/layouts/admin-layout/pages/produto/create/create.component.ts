//Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

//Models
import { Produto } from '../produto.model';

//Services
import { ProdutoService } from '../produto.service';

@Component({
    selector: 'produto-create',
    moduleId: module.id,
    templateUrl: 'create.component.html'
})

export class ProdutoCreateComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
     
    }

}

