export class MapperUtils {
    private static readonly dropdownSettingsSingleDefault = {
        singleSelection: true, 
        text:"-- Selecione --",
        enableSearchFilter: true,
        searchPlaceholderText: "Pesquisa",
        badgeShowLimit: 5,
        showCheckbox: false,
        disabled: false,
    };
    
    private static readonly dropdownSettingsSingleCustom = {
        singleSelection: true,
        text: '-- Selecione --',
        enableSearchFilter: true,
        searchPlaceholderText: 'Pesquisa',
        primaryKey: 'code',
        badgeShowLimit: 5,
        showCheckbox: false,
        disabled: false,
    };
    
    private static readonly dropdownSettingsMultipleDefault = {
        singleSelection: false, 
        text:"-- Selecione --",
        selectAllText:'Selecionar todos',
        unSelectAllText:'Desmarcar todos',
        enableSearchFilter: true,
        searchPlaceholderText: "Pesquisa",
        position: "button",
        badgeShowLimit: 5,
        disabled: false,
    };
      
    private static readonly dropdownSettingsMultipleCustom = {
        singleSelection: false, 
        text:"-- Selecione --",
        selectAllText:'Selecionar todos',
        unSelectAllText:'Desmarcar todos',
        searchPlaceholderText: "Pesquisa por descrição",
        noDataLabel: "Digite a descrição para pesquisa...",
        searchBy: ['itemName'],
        enableSearchFilter: true,
        badgeShowLimit: 4,
        maxHeight: 200,
        disabled: false,
    };
    
    private static readonly dropdownSettingsMultiplePaginateCustom = {
        singleSelection: false, 
        text:"-- Selecione --",
        selectAllText:'Selecionar todos',
        unSelectAllText:'Desmarcar todos',
        searchPlaceholderText: "Pesquisa por descrição",
        noDataLabel: "Digite a descrição para pesquisa...",
        searchBy: ['itemName'],
        primaryKey: 'id',
        labelKey: 'itemName',
        enableSearchFilter: true,
        badgeShowLimit: 4,
        lazyLoading: true,
        disabled: false,
        addNewItemOnFilter: true,
        addNewButtonText: 'Novo item'
    };
    
    public static getDropdownSettingsSingleDefault(){
        return Object.assign({}, this.dropdownSettingsSingleDefault);
    };
    
    public static getDropdownSettingsSingleCustom(){
        return Object.assign({}, this.dropdownSettingsSingleCustom);
    };
    
    public static getDropdownSettingsMultipleDefault(){
        return Object.assign({}, this.dropdownSettingsMultipleDefault);
    };
    
    public static getDropdownSettingsMultipleCustom(){
        return Object.assign({}, this.dropdownSettingsMultipleCustom);
    };
    
    public static getDropdownSettingsMultiplePaginateCustom(){
        return Object.assign({}, this.dropdownSettingsMultiplePaginateCustom);
    };
}
