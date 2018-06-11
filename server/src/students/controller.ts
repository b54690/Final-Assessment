import { Post, Param, HttpCode, Get, Body, JsonController, Put, NotFoundError, Delete} from 'routing-controllers'
import Student from './entity';
import * as request from 'superagent'


@JsonController()
export default class StudentController {

    @Get('/students')
    async all() {
    const students = await Student.find()
    if (!students) throw new NotFoundError('There are no students')
    return { students }
    }

    @Get('/studentsbyclass/:id([0-9]+)')
    @HttpCode(201)
    getStudentsByClass(
        @Param('id') batchId: number
    ) {
        let studentsByClass = Student.find( {batchId: batchId} ) 

        return studentsByClass 
    }

    @Post('/students')
    @HttpCode(201)
    async addStudent(
        @Body() student: Student
    ) {
        const entity = await student.save()

        return entity
    }

      @Get('/students/:id')
      async student(
        @Param('id') id: number
    ) {
        const student = await Student.findOne(id)
        return { student }
      }


    @Put('/students/:id')
    async updateStudent(
        @Param('id') id: number,
        @Body() update: Partial<Student> 
    ) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Student was not found')
        const studentUpdated = Student.merge(student, update)
        const entity = await studentUpdated.save()
        return entity
    }

    @Delete('/students/:id')
    async deleteStudent(
        @Param('id') id: number
    ) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Student was not found')
        if (student) Student.remove(student)
        return 'Student was deleted successfully'
    }
}