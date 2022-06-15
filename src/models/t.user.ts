import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 用户表
const TUser = defineModel('t_users', {
  // 账户
  account: {
    field: 'account',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '账户',
  },
  // 昵称
  nickname: {
    field: 'nickname',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '昵称',
  },
  // 头像URL
  avatarUrl: {
    field: 'avatar_url',
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '头像URL',
  },
  // 手机号
  phone: {
    field: 'phone',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '手机号',
  },
  // 邮箱
  mail: {
    field: 'mail',
    type: DataTypes.STRING(64),
    allowNull: true,
    comment: '邮箱',
  },
  // 积分
  point: {
    field: 'point',
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '积分',
  },
  // 角色id
  roleId: {
    field: 'role_id',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '角色id',
  },
  // 状态（0：停止，1：正常）
  status: {
    field: 'status',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '状态（0：停止，1：正常）',
  },
  // 注册时间
  registerTime: {
    field: 'register_time',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '注册时间',
  },
  // 注册IP
  registerIp: {
    field: 'register_ip',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '注册IP',
  },
  // 最近登录时间
  lastLoginTime: {
    field: 'last_login_time',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '最近登录时间',
  },
  // 最近登录IP
  lastLoginIp: {
    field: 'last_login_ip',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '最近登录IP',
  },
});

export default TUser;
