import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@JsonController('/analysis/sentiment')
export default class AnalysisSentimentController {
  @Get('/')
  getSentiment() {
    return 'getSentiment';
  }

  @Post('/create')
  createSentiment() {
    return 'createSentiment';
  }

  @Put('/update')
  updateSentiment() {
    return 'updateSentiment';
  }

  @Delete('/delete')
  deleteSentiment() {
    return 'deleteSentiment';
  }
}
