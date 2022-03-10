import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
} from 'routing-controllers';
import StatisticsService from '@/services/analysis/statistics';

@JsonController('/analysis/statistics')
export default class AnalysisStatisticsController {
  @Get('/')
  getStatistics(
    @QueryParam('startDate') startDate: string,
    @QueryParam('endDate') endDate: string,
  ) {
    return StatisticsService.getStatistics(startDate, endDate);
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
