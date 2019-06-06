export class StringUtils {
    public static isNullOrEmpty(val: any): boolean {
        if(typeof val === "string"){
            if(val === undefined || val === null || val.trim() === '')
                return true;
        }
        else {
            if(val === undefined || val === null)
                return true;
        }
        
        return false;
    }

    public static isNull(value: any): boolean {
        return (value === undefined || value === null);
    }

    public static clearString(value: string): string  { 
        if(value == undefined || value == null)
            return '';
        
        value = value.toString().replace(/\-/g, '');
        value = value.toString().replace(/\(/g, '');
        value = value.toString().replace(/\)/g, '');
        value = value.toString().replace(/\./g, '');
    
        return value;
    }    

    public static hasElement(value: any[]): boolean {
        return (value === undefined || value === null || value.length > 0);
    }

    public static defaultIfEmpty(val: any, defaultValue: any){
        if(this.isNullOrEmpty(val))
          return defaultValue;
        else
          return val;
    }
    
    public static dataFormatada(dataString: string): string {
        var data = dataString ? new Date(dataString) : new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();

        return diaF + "/" + mesF + "/" + anoF;
    }

    public static dataAtualFormatada(): string {
        return this.dataFormatada(null);
    }

    public static getCurrentDateTimeFormat(): string {
        let data =  new Date();
        let dia = data.getDate().toString();
        let diaF = (dia.length == 1) ? '0' + dia : dia;
        let mes = (data.getMonth() + 1).toString();  //+1 pois no getMonth Janeiro começa com zero.
        let mesF = (mes.length == 1) ? '0' + mes : mes;
        let anoF = data.getFullYear();
        let hour = data.getHours().toString();
        let hourf = (hour.length == 1) ? '0' + hour : hour;
        let min = data.getMinutes().toString();
        let minf = (min.length == 1) ? '0' + min : min;
        let sec = data.getSeconds().toString();
        let secf = (sec.length == 1) ? '0' + sec : sec;
    
        return anoF + mesF + diaF + '-' + hourf + minf + secf;
    }

    public static formataCPF(valor: any): string {
        valor = `${valor}`;
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    }

    public static converteData(data): string {
        let dataArray = data.split("-");
        if (dataArray[2])
            return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
        else
            return data;
    }
}