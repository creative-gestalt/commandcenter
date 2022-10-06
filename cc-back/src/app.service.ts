import { Injectable } from '@nestjs/common';
import * as util from 'util';
import { EventsGateway } from './events/events.gateway';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

@Injectable()
export class AppService {
  constructor(private eventService: EventsGateway) {}

  async getTemps(): Promise<string> {
    const { stdout } = await exec('sensors -j');
    const data = JSON.parse(stdout);
    let final = `P-id:      ${data['coretemp-isa-0000']['Package id 0']['temp1_input']} °C\n`;
    final += `Core 0:  ${data['coretemp-isa-0000']['Core 0']['temp2_input']} °C\n`;
    final += `Core 1:   ${data['coretemp-isa-0000']['Core 1']['temp3_input']} °C\n`;
    final += `Fan:      ${data['applesmc-isa-0300']['Exhaust  ']['fan1_input']} rpm`;
    return final;
  }

  async runCommand(command: string): Promise<string> {
    const result = await exec(command);
    return result.stdout;
  }

  async buildProject(projectName: string): Promise<void> {
    this.eventService.getProgress('docker compose down');
    return await exec(`cd ~/Projects/${projectName} && docker compose down`, {
      shell: '/bin/bash',
    })
      .then(async () => {
        this.eventService.getProgress('git pull');
        await exec(`cd ~/Projects/${projectName} && git pull`, {
          shell: '/bin/bash',
        })
          .then(async () => {
            this.eventService.getProgress('docker compose build --force-rm');
            await exec(
              `cd ~/Projects/${projectName} && docker compose build --force-rm`,
              {
                shell: '/bin/bash',
              },
            )
              .then(async () => {
                this.eventService.getProgress('docker compose up -d');
                await exec(
                  `cd ~/Projects/${projectName} && docker compose up -d`,
                  {
                    shell: '/bin/bash',
                  },
                )
                  .then(async () => {
                    this.eventService.getProgress(
                      'docker image prune -f && docker network prune -f',
                    );
                    await exec(
                      'docker image prune -f && docker network prune -f',
                      {
                        shell: '/bin/bash',
                      },
                    )
                      .then(() => this.eventService.getProgress(''))
                      .catch((error) =>
                        this.eventService.getProgress(
                          `Error: ${error.cmd}; ${error.code}`,
                        ),
                      );
                  })
                  .catch((error) =>
                    this.eventService.getProgress(
                      `Error: ${error.cmd}; Code: ${error.code}`,
                    ),
                  );
              })
              .catch((error) =>
                this.eventService.getProgress(
                  `Error: ${error.cmd}; Code: ${error.code}`,
                ),
              );
          })
          .catch((error) =>
            this.eventService.getProgress(
              `Error: ${error.cmd}; Code: ${error.code}`,
            ),
          );
      })
      .catch((error) =>
        this.eventService.getProgress(
          `Error: ${error.cmd}; Code: ${error.code}`,
        ),
      );
  }
}
