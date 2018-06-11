import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';

@Entity()
export default class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', { nullable: false })
    name: string

    @Column('text', { nullable: false })
    picture: string

    @Column('text', { nullable: true })
    batchId: number

    @Column('text', { nullable: true, default: 'Grey'  })
    latestEvaluation: string
}