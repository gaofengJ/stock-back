import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 权限表
const TRole = defineModel('t_auths', {
  // 权限名称
  authName: {
    field: 'auth_name',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '权限名称',
  },
  // 权限类型
  authType: {
    field: 'auth_type',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '权限类型',
  },
  // 权限状态(0：停用，1：正常)
  status: {
    field: 'status',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '权限状态(0：停用，1：正常)',
  },
  // 备注
  comment: {
    field: 'comment',
    type: DataTypes.STRING(128),
    allowNull: true,
    comment: '备注',
  },
});

export default TRole;
