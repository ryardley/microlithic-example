import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;
}
