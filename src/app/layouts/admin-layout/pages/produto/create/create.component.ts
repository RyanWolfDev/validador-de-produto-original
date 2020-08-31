//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//Models
import { Produto } from '../produto.model';
import { DataTable } from '../../../../../components/dataTable/dataTable.model';
import { ToolbarButton } from '../../../../../components/toolbarButton/toolbarButton.model';
import { Token } from '../../token/token.model';

//Services
import { ProdutoService } from '../produto.service';
import { TokenService } from '../../token/token.service';

@Component({
    selector: 'produto-create',
    moduleId: module.id,
    templateUrl: 'create.component.html'
})

export class ProdutoCreateComponent implements OnInit, OnDestroy {

    produto: Produto;
    produtoId: number;
    pageTitle: string = 'Novo Produto';
    private mode = 'create';
    fieldRequiredMessage: string = "* Campo obrigatório";
    form: FormGroup;
    private dataSub: Subscription;
    showNewTokenModal: boolean = false;
    tokenForm: FormGroup;
    showTokensCreatedTable: boolean = false;
    tokensCreated: Token[] = [];

    //Pagination
    pageSizeOptions = [10, 25, 50, 100];

    //Autorizacao DataTable
    dataTableHead: string[] = [
        "checkbox",
        "Token",
        "Criado em"
    ];

    isClickable = false;

    dataTableProperties: Object[] = [
        {
            name: "",
            type: "checkbox",
        },
        {
            name: "token",
            type: "text",
        },
        {
            name: "createdAt",
            type: "date",
        },
    ];

    dataTable: DataTable = {
        count: 0,
        currentPage: 1,
        pageSize: this.pageSizeOptions[0],
        message: "",
        result: [],
    };

    //Toolbar Buttons
    toolbarButtons: ToolbarButton[] = [
        {
            name: "Imprimir",
            colorClass: "warning",
            iconClass: "nc-icon nc-tag-content",
            size: 5,
            function: () => {
                this.createNewTokens();
            },
        },
        {
            name: "Gerar Tokens",
            colorClass: "success",
            iconClass: "nc-icon nc-simple-add",
            size: 6,
            function: () => {
                this.createNewTokens();
            },
        },
    ];

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
        private produtoService: ProdutoService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.isEdit();
    }

    buildForm() {
        this.form = this.fb.group({
            id: ['', Validators.required],
            descricao: ['', Validators.required],
            sku: ['', Validators.required],
            imagemUrl: ['', Validators.required],
            ativo: [true, Validators.required],
        })
    }

    buildTokenForm() {
        this.tokenForm = this.fb.group({
            quantidade: ['', Validators.required],
            produto_id: [this.produtoId, Validators.required]
        })
    }

    isEdit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {

            const param = paramMap.get("id");

            if (param !== 'new') {
                this.mode = 'edit';

                this.pageTitle = `ID: ${param}`;

                this.buildTokenForm();

                this.produtoService.getById(parseInt(param)).subscribe(response => {
                    this.produto = response.result;

                    this.form.setValue({
                        id: this.produto.id,
                        descricao: this.produto.descricao,
                        sku: this.produto.sku,
                        imagemUrl: this.produto.imagemUrl,
                        ativo: this.produto.ativo,
                    });

                    this.tokenForm.setValue({
                        produto_id: this.produto.id,
                        quantidade: ''
                    })

                    this.getTokens();
                });
            } else {
                this.id.disable();
            }
        });
    }

    onSubmit() {

        if (this.form.invalid) {
            return;
        }

        if (this.mode === 'edit') {
            this.produtoService.update(this.form.value);
        } else {
            this.produtoService.save(this.form.value);
        }
    }

    onCancel() {
        this.router.navigate(["/admin/produto"]);
    }

    getTokens() {

        this.tokenService.getAll(this.dataTable.pageSize, this.dataTable.currentPage, "", this.produto.id);

        this.dataSub = this.tokenService
            .getDataUpdatedListener()
            .subscribe((response: DataTable) => {
                this.dataTable = response;
            });
    }

    createNewTokens() {
        this.showNewTokenModal = true;
    }

    onCancelTokenForm() {
        this.showNewTokenModal = false;
        this.showTokensCreatedTable = false;
        this.tokensCreated = [];
        this.tokenForm.patchValue({ quantidade: '' });
    }

    onSubmitTokenForm() {

        if (this.tokenForm.invalid) {
            return;
        }

        this.tokenService.save(this.tokenForm.value).subscribe((response) => {
            this.getTokens();
            this.showTokensCreatedTable = true;
            this.tokensCreated = response.result;
        });
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }

    get id() { return this.form.get('id'); }
    get descricao() { return this.form.get('descricao'); }
    get sku() { return this.form.get('sku'); }
    get imagemUrl() { return this.form.get('imagemUrl'); }
    get ativo() { return this.form.get('ativo'); }

}

