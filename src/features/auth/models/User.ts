import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @Column('text')
  public role: 'admin' | 'user';
}
