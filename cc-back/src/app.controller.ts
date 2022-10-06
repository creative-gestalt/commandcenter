import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AddServiceDto } from './dto/service-file.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('temperatures')
  async getTemps(): Promise<string> {
    return await this.appService.getTemps();
    // return res.status(HttpStatus.OK).json(result);
  }

  @Post('command')
  async runCommand(@Res() res, @Body() body): Promise<string> {
    const result = await this.appService.runCommand(body.command);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('deploy_project')
  async buildProject(
    @Res() res,
    @Body() body: Record<string, string>,
  ): Promise<string> {
    const result = await this.appService.buildProject(body.projectName);
    return res.status(HttpStatus.OK).json(result);
  }
}
