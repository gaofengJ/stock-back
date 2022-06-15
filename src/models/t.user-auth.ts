import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 用户授权信息表
const TUserAuth = defineModel('t_user_auth', {
  // userId
  userId: {
    field: 'user_id',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: 'userId',
  },
  // 登录类型或第三方应用名称
  identityType: {
    field: 'identity_type',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '登录类型或第三方应用名称',
  },
  // 标识（第三方唯一标识）
  identifier: {
    field: 'identifier',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '标识（第三方唯一标识）',
  },
  // 密码凭证（密码或token）
  credential: {
    field: 'credential',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '密码凭证（密码或token）',
  },
});

export default TUserAuth;
