declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from '@prisma/client';

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;
  private constructor() {
    this.prisma = new PrismaClient();
    if (process.env.NODE_ENV === 'production') {
      this.prisma = new PrismaClient();
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      this.prisma = global.prisma;
    }
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

export default DBClient;
