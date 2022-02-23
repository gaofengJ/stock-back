import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@JsonController('/analysis/statistics')
export default class AnalysisStatisticsController {
  @Get('/')
  getStatistics() {
    return 'getStatistics';
  }

  @Post('/create')
  createStatistics() {
    return 'createStatistics';
  }

  @Put('/update')
  updateStatistics() {
    return 'updateStatistics';
  }

  @Delete('/delete')
  deleteStatistics() {
    return 'deleteStatistics';
  }
}
