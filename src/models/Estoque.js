module.exports = (sequelize, DataTypes) => {
    const Estoque = sequelize.define('Estoque', {
        id_produto: DataTypes.INTEGER,
        id_unidade: DataTypes.INTEGER,
        quantidade_atual: DataTypes.INTEGER
    }, { 
        tableName: 'estoque', 
        timestamps: false 
    });

    return Estoque; // O arquivo DEVE retornar a definição do modelo
};