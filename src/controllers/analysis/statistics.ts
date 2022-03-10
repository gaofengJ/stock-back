import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
} from 'routing-controllers';
import AnalysisStatisticsService from '@/services/analysis/statistics';

@JsonController('/analysis/statistics')
export default class AnalysisStatisticsController {
  @Get('/')
  getStatistics(
    @QueryParam('date') date: string,
  ) {
    return AnalysisStatisticsService.getStatistics(date);
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
