import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { IndividualSellerService } from "./individualseller.service";
import { IndividualSellerDto } from "./dto/individualseller.dto";
import { CreateIndividualSellerDto } from "./dto/createIndividualSeller.dto";
import { UpdateIndividualSellerDto } from "./dto/updateIndividualSeller.dto";
import { ApiDataArrayResponse } from "../shared/decorator/dto-dataArray-decorator";
import { ApiDataObjectResponse } from "../shared/decorator/dto-dataObject-decorators";
import { ApiPaginatedResponse } from "../shared/decorator/dto-paginated-decorator";
import { PageOptionsDto } from "../shared/dto/pageOptions.dto";
import { DataResponseDtoPagination } from "../shared/dto/data_response_dto_pagination";
import { UpdateStoreStatusDto } from "./dto/updateStatus.dto";
import { RequestDocumentMailDto } from "../STORE/dto/requestDocumentMail.dto";

@Controller("individual_seller")
@ApiTags("individual_seller")
export class IndividualSellerController {
  constructor(
    private readonly individualsellerService: IndividualSellerService
  ) {}
  
  @Get('pgn')
  @ApiBearerAuth()
  @ApiPaginatedResponse(IndividualSellerDto)
  findWithPagination(
  @Query() pageOptions: PageOptionsDto
  ): Promise<DataResponseDtoPagination> | Promise<DataResponseDto> {
  return this.individualsellerService.findWithPagination(pageOptions);
  }

  @Get(":id")
  @ApiDataObjectResponse(IndividualSellerDto)
  @ApiParam({ name: "id", required: true })
  @HttpCode(200)
  findOne(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.individualsellerService.findOne(id);
  }

  @Post('create')
  @ApiDataObjectResponse(IndividualSellerDto)
  @HttpCode(200)
  @ApiBearerAuth()
  create(@Body() create: CreateIndividualSellerDto): Promise<DataResponseDto> {
    return this.individualsellerService.create(create);
  }

  @Post('send_mail')
  @ApiCreatedResponse({ type: IndividualSellerDto })
  @HttpCode(200)
  @ApiBearerAuth()
  requestDocumentMail(@Body() mail: RequestDocumentMailDto): Promise<DataResponseDto> {
    return this.individualsellerService.reqestDocumentMail(mail);
  }

  // @Put(":id")
  // @ApiDataObjectResponse(IndividualSellerDto)
  // @ApiParam({ name: "id", required: true })
  // @ApiBearerAuth()
  // update(
  //   @Param("id", new ParseIntPipe()) id: number,
  //   @Body() update: UpdateIndividualSellerDto
  // ): Promise<DataResponseDto> {
  //   return this.individualsellerService.update(id, update);
  // }

  @Put("status/:id")
  @ApiDataObjectResponse(IndividualSellerDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() update: UpdateStoreStatusDto
  ): Promise<DataResponseDto> {
    return this.individualsellerService.updateStatus(id, update);
  }

  @Delete(":id")
  @ApiDataObjectResponse(IndividualSellerDto)
  @ApiParam({ name: "id", required: true })
  @ApiBearerAuth()
  delete(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<DataResponseDto> {
    return this.individualsellerService.delete(id);
  }
}
