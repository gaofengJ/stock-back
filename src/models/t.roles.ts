import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 角色表
const TRole = defineModel('t_roles', {
  // 角色名称
  roleName: {
    field: 'role_name',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '角色名称',
  },
  // 角色描述
  roleDesc: {
    field: 'role_desc',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '角色描述',
  },
  // 角色状态(0：停用，1：正常)
  status: {
    field: 'status',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '角色状态(0：停用，1：正常)',
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
