// [ 사용자 정보를 저장하는 모델 ]
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // user : post => 1 : N 
    db.User.hasMany(db.Post);

    // user : user => N : M
    // 각 테이블의 foreignkey는 받아올 상대 테이블 키
    // 각 테이블의 as는 각 모델 명
    db.User.belongsToMany(db.User, { // Follower 테이블
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, { // Follwing 테이블
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};