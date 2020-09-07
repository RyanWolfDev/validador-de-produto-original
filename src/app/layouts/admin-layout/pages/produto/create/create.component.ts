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
import { ToastrService } from 'ngx-toastr';
import { PrintPageSerivce } from '../../../../../components/print-page/print-page.service';

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

    //Tokens Variables
    private dataSub: Subscription;
    showNewTokenModal: boolean = false;
    tokenForm: FormGroup;
    showTokensCreatedTable: boolean = false;
    tokensCreated: Token[] = [];
    filterText: string;

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
                this.onPrintTokens();
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
        private tokenService: TokenService,
        private toastr: ToastrService,
        private printPageService: PrintPageSerivce
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


                this.buildTokenForm();

                this.produtoService.getById(parseInt(param)).subscribe(response => {
                    this.produto = response.result;

                    if (Object.keys(this.produto).length === 0) {
                        this.showNotification('Produto não encontrado!', "danger")
                        this.router.navigate(["/admin/produto"]);
                        return;
                    }

                    this.pageTitle = `ID: ${param}`;

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

    ngOnDestroy() {
        if (this.mode === 'edit' && this.dataSub)
            this.dataSub.unsubscribe();
    }

    //#region TOKEN FUNCTIONS
    getTokens(pageSize: number = this.dataTable.pageSize, currentPage: number = this.dataTable.currentPage, filterSearch = this.filterText) {

        this.tokenService.getAll(pageSize, currentPage, filterSearch, this.produto.id);

        this.dataSub = this.tokenService
            .getDataUpdatedListener()
            .subscribe((response: DataTable) => {
                this.dataTable = response;
            });
    }

    onChangedPage(page) {
        this.dataTable.currentPage = page;
        this.getTokens(this.dataTable.pageSize, page);
    }

    onChangedPageSize(pageSize) {
        this.dataTable.pageSize = pageSize;
        this.getTokens(pageSize, this.dataTable.currentPage);
    }

    filterSearch(filterSearch) {
        this.filterText = filterSearch;
        this.getTokens(
            this.dataTable.pageSize,
            this.dataTable.currentPage,
            filterSearch
        );
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

    onPrintTokens() {
        const checkedRows = this.getCheckedRows();
        if (checkedRows.length < 1) {
            this.showNotification('Nenhum Token foi selecionado', 'warning')
            return;
        }
        this.printPageService.print(checkedRows);
    }

    onPrintAllTokens(tokens) {
        this.printPageService.print(tokens);
    }

    getCheckedRows() {
        return this.dataTable.result.filter((value, index, array) => {
            return value.isChecked === true;
        });
    }
    //#endregion

    showNotification(message: string, type: string) {
        this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">' +
            message +
            "</span>",
            "",
            {
                timeOut: 4000,
                enableHtml: true,
                closeButton: true,
                toastClass: `alert alert-${type} alert-with-icon`,
                positionClass: "toast-top-right",
            }
        );
    }
    get id() { return this.form.get('id'); }
    get descricao() { return this.form.get('descricao'); }
    get sku() { return this.form.get('sku'); }
    get imagemUrl() { return this.form.get('imagemUrl'); }
    get ativo() { return this.form.get('ativo'); }

}

