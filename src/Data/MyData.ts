class Data {

    /**
     * Aqui vamo simular um array de registros onde retorna o usuario e seus dados
     */
    private _DataArray = [
        {
            id: 1,
            nome: "Joao Vitor Lima Reis",
            idade: 19,
            rua: "Jose thiago da silva",
            bairro: "Nova Gameleira",
            cidade: "Belo Horizonte",
            estado: "Minas Gerais",
            cep: "30510-150",
        },
        {
            id: 2,
            nome: "Gislane Santos Lima Reis",
            idade: 45,
            rua: "Jose thiago da silva",
            bairro: "Nova Gameleira",
            cidade: "Belo Horizonte",
            estado: "Minas Gerais",
            cep: "305310-350",
        }
    ]

    private _DataSubObject = [
        {
            id: 1,
            nome: "Joao Vitor Lima Reis",
            endereco: {
                rua: "Jose thiago da silva",
                bairro: "Nova Gameleira",
                cidade: "Belo Horizonte",
                estado: "Minas Gerais",
                cep: "30510-150",
                data: {
                    name: "Linco"
                }
            }
        },
        {
            id: 2,
            nome: "Gislane Santos Lima Reis",
            endereco: {
                rua: "Jose thiago da silva",
                bairro: "Nova Gameleira",
                cidade: "Belo Horizonte",
                estado: "Minas Gerais",
                cep: "305310-350",
            }
        }
    ]


    get getDataArray() {
        return this._DataArray;
    }

    get getDataSubObject() {
        return this._DataSubObject
    }

}


export { Data }