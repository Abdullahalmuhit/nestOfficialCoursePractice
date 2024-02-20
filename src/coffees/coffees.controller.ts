import { 
    Body,
     Controller, 
     Delete, 
     Get, 
     Param, 
     Patch, 
     Post, 
     Query} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){

    }
    @Get('/')
    findAll() {
        return this.coffeesService.findAll();
    }
    @Get('/pagination')
    findAllPagination(@Query() paginationQuery: PaginationQueryDto) {
        return this.coffeesService.findAllPagination(paginationQuery)
     

        // const {limit, offset} = paginationQuery;
        // return `Action returns all coffees. Limit $ {limit}, offset ${offset}`;
    }
    @Get(':id')
    findOne(@Param('id') id:number){
         return this.coffeesService.findOne(id);

        // return `This Action returns #${id} coffee`

    }
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto ){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);
    }
    @Delete(':id')
    remove(@Param('id') id:number){
        return this.coffeesService.remove(id);
    }
}
