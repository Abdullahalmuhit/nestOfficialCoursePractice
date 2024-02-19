import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'MD@@muhit1296',
    database: 'try_nest',
    entities: [],
    synchronize: true,
    autoLoadEntities: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
