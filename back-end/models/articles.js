module.exports = (sequelize, DataTypes) => {
    const Articles = sequelize.define(
      "Articles",
      {
        id:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        title:{
          type: DataTypes.STRING,
          allowNull:false,
          validate: {len:[5,200]}
        },
        resume: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {len:[10,250]}  
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },

      {
        freezeTableName: true,
        timestamps:false
      }
      
    );
    return Articles;
 };