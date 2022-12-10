import { Prisma, RequestStatus } from '@prisma/client';
import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class AdminAccommodationService {
    getAllAdminAccommodation() {
        try {
            return "AllAdminAccommodation"
        } catch (error) {
            throw new Error(error)
        }

    }
}
