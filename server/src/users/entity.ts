import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer';
import { MinLength, IsEmail, IsString } from 'class-validator'
import * as bcrypt from 'bcrypt'


@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  @MinLength(2)
  firstName: string

  @IsString()
  @Column('text', {nullable:false})
  @MinLength(2)
  lastName: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
}

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
}
}