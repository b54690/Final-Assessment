"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let StudentController = class StudentController {
    async all() {
        const students = await entity_1.default.find();
        if (!students)
            throw new routing_controllers_1.NotFoundError('There are no students');
        return { students };
    }
    getStudentsByClass(batchId) {
        let studentsByClass = entity_1.default.find({ batchId: batchId });
        return studentsByClass;
    }
    async addStudent(student) {
        const entity = await student.save();
        return entity;
    }
    async student(id) {
        const student = await entity_1.default.findOne(id);
        return { student };
    }
    async updateStudent(id, update) {
        const student = await entity_1.default.findOne(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Student was not found');
        const studentUpdated = entity_1.default.merge(student, update);
        const entity = await studentUpdated.save();
        return entity;
    }
    async deleteStudent(id) {
        const student = await entity_1.default.findOne(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Student was not found');
        if (student)
            entity_1.default.remove(student);
        return 'Student was deleted successfully';
    }
};
__decorate([
    routing_controllers_1.Get('/students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "all", null);
__decorate([
    routing_controllers_1.Get('/studentsbyclass/:id([0-9]+)'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getStudentsByClass", null);
__decorate([
    routing_controllers_1.Post('/students'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    routing_controllers_1.Get('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "student", null);
__decorate([
    routing_controllers_1.Put('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateStudent", null);
__decorate([
    routing_controllers_1.Delete('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map