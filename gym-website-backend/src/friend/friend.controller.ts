import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendService } from './friend.service';
import { UserService } from '../users/user.service';
import { FriendStatusDto } from './dto/friend-status.dto';
import { query } from 'express';
import * as http from 'http';
import { GetFr_wNames } from './dto/getFr_wNames';

@Controller('friend')
export class FriendController {
  constructor(
    private _friendService: FriendService,
    private _userService: UserService,
  ) {}

  @Get('getRequestsByEmail/:userEmail')
  findAllByUserId(
    @Param('userEmail') userEmail: string,
  ): Promise<FriendRequestDto[]> {
    return this._friendService.getRequestsByEmail(userEmail);
  }

  @Get('getFriendsByEmail/:userEmail')
  getFriendsByEmail(@Param('userEmail') userEmail: string): any {
    return this._friendService.getFriendsByEmail(userEmail);
  }

  @Post('submitRequest')
  async submitFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<boolean> {
    return this._friendService.submitFriendRequest(
      frRequest.senderId,
      frRequest.receiverId,
      frRequest.isAccepted,
    );
  }
  @Post('removeRequest')
  async deleteFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<boolean> {
    return this._friendService.removeRequest(frRequest);
  }

  @Post('actionOnRequet')
  async respondFriendRequest(
    @Body() frRequest: FriendRequestDto,
  ): Promise<boolean> {
    console.log('Api end Point   ' + frRequest);
    const actionResult = this._friendService.respondFriendRequest(frRequest);
    if (actionResult == null) throw new Error('Action was not successful');
    return true;
  }

  @Get('getNamesForRequests/:userEmail')
  async getNamesForRequests(
    @Param('userEmail') userEmail: string,
  ): Promise<GetFr_wNames[]> {
    return this._friendService.getRequestsWithNames(userEmail);
  }
}
