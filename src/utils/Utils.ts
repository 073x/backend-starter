import crypto, { CipherGCMTypes, randomUUID } from 'crypto';
import { AxiosError } from 'axios';
import Constants from './Constants';
import { Decimal } from 'decimal.js';
import { Promise } from 'bluebird';
import QRCode from 'qrcode';
import { Request } from 'express';
import { ServerAction } from '../../types/Server';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import http from 'http';
import moment from 'moment';
import { nanoid } from 'nanoid';
import os from 'os';
import path from 'path';
import tzlookup from 'tz-lookup';
import validator from 'validator';

const MODULE_NAME = 'Utils';

export default class Utils {

  public static convertBufferArrayToString(data: ArrayBuffer): string {
    if (!data) {
      return null;
    }
    if (data.byteLength === 0) {
      return '';
    }
    return Buffer.from(data).toString();
  }

  public static hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  public static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static hashPassword(password: string): string {
    return Utils.hash(password);
  }

  public static isValidDate(date: any): boolean {
    return moment(date).isValid();
  }

  public static isDevelopmentEnv(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development-build';
  }

  public static isProductionEnv(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  public static isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  public static getTimezone(coordinates: number[]): string {
    if (coordinates && coordinates.length === 2) {
      return tzlookup(coordinates[1], coordinates[0]);
    }
    return null;
  }

}
