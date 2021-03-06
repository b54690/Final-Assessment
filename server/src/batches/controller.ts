import { Authorized, JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError } from 'routing-controllers'
import Batch from './entity'

@JsonController()
export default class BatchController {

    @Get('/batches/:id')
    getBatch(
        @Param('id') id: number
    ) {
        return Batch.findOne(id)
    }

    @Get('/batches')
    async allBatches() {
        const batches = await Batch.find()
        return {batches}
    }

    @Authorized()
    @Put('/batches/:id')
    async updateBatch(
      @Param('id') id: number,
      @Body() update: Partial<Batch>
    ) {
    
      const batch = await Batch.findOne(id);
      if (!batch) throw new NotFoundError('Cannot find batch')
    
      return Batch.merge(batch, update).save()
    }

    @Authorized()
    @Post('/batches')
    @HttpCode(201)
    createBatch(
      @Body() batch: Batch
    ) {
      return batch.save()
    }

    }
