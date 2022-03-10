import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@JsonController('/analysis/rise-num')
export default class AnalysisRiseNumController {
  @Get('/')
  getRiseNum() {
    return 'getRiseNum';
  }

  @Post('/create')
  createRiseNum() {
    return 'createRiseNum';
  }

  @Put('/update')
  updateRiseNum() {
    return 'updateRiseNum';
  }

  @Delete('/delete')
  deleteRiseNum() {
    return 'deleteRiseNum';
  }
}
