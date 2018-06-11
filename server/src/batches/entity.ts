import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { MinLength, IsString, IsDate } from 'class-validator'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  title: string

  @IsDate()
  @IsString()
  @Column('text', {nullable:false})
  @MinLength(10)
  startDate: string

  @IsDate()
  @Column('text', {nullable:false})
  @MinLength(10)
  endDate: string
}

