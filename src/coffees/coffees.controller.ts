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

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){
        
    }
    @Get('/')
    findAll() {
        return "Get All Coffees";
    }
    @Get('/pagination')
    findAllPagination(@Query() paginationQuery) {
        const {limit, offset} = paginationQuery;
        return `Action returns all coffees. Limit $ {limit}, offset ${offset}`;
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return `This Action returns #${id} coffee`

    }
    @Post()
    create(@Body() body ){
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return `this is Update id  #${id} this is body: #${body}` ;
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return `This is remove id #${id}`;
    }
}
