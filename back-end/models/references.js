module.exports = (sequelize, DataTypes) => {
    const References = sequelize.define(
      "References",
      {
        Referenceid:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true    
        },
        Referencetitle:{
          type: DataTypes.STRING,
          allowNull:false,
        },
        Referencedate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        authors:{
            type: DataTypes.STRING,
            allowNull:false
        }
      },

      {
        freezeTableName: true,
        timestamps:false
      }
      
    );
    return References;
 };