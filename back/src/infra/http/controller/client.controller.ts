import { CreateClient } from '@application/use-cases/clients/create-client';
import { DeleteClient } from '@application/use-cases/clients/delete-client';
import { GetClient } from '@application/use-cases/clients/get-client';
import { ListAll } from '@application/use-cases/clients/listAll-client';
import { UpdateClient } from '@application/use-cases/clients/update-client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClientBody } from '../dtos/client/create-client-body';
import { ParamsId } from '../dtos/client/params-id-client';
import { UpdateClientBody } from '../dtos/client/update-client-body';
import { ClientViewModel } from '../view-models/client-views-models';

@Controller('client')
export class ClientController {
  constructor(
    private createClient: CreateClient,
    private deleteClient: DeleteClient,
    private getClient: GetClient,
    private listAllClient: ListAll,
    private updateClient: UpdateClient,
  ) {}

  @Post('create')
  async create(@Body() body: CreateClientBody) {
    const { client } = await this.createClient.execute(body);

    return {
      client: ClientViewModel.toHttp(client),
    };
  }

  @Get('list/:id')
  async get(@Param() params: ParamsId) {
    const { id } = params;
    const client = await this.getClient.execute(id);
    if (!client) {
      return { message: 'Cliente não encontrado' };
    }
    return client;
  }

  @Get('list')
  async list() {
    const list = await this.listAllClient.execute();

    return list;
  }

  @Patch('update/:id')
  async update(@Param() params: ParamsId, @Body() body: any) {
    const { id } = params;
    const clientExists = await this.getClient.execute(id);
    if (!clientExists) {
      return { message: 'Cliente não encontrado' };
    }

    const client = await this.updateClient.execute({ id: id, ...body });

    return client;
  }

  @Delete('delete/:id')
  async delete(@Param() params: ParamsId) {
    const { id } = params;
    const clientExists = await this.getClient.execute(id);
    if (!clientExists) {
      return { message: 'Cliente não encontrado' };
    }

    const client = await this.deleteClient.execute(id);

    return client;
  }
}
