import { Deserializable } from './deserializable';
import { Base } from './base';
import { Beneficio } from './beneficio';

export class BeneficioTipo extends Base implements Deserializable {
    beneficio: Beneficio;
    tipoBeneficio: string;
    tipoDesconto: string;
    valorDesconto: number;
    valorAntigo: number;
    porcentagem: number;
    quantidadeBeneficio: number;
    maximaUsuario: number;
    publico: string;
    urlSite: string;
    codigoIdentificacao: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
