import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[]= [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla']
        }
    ]; 

    findAll() {
        return this.coffees;
    }
    findAllPagination(@Query() paginationQuery) {
        const {limit, offset} = paginationQuery;
        return `Action returns all coffees. Limit $ {limit}, offset ${offset}`;
    }
    findOne(id:string){
        return this.coffees.find(item => item.id === +id);

    }
    create(createCoffeeDto:any ){
        return this.coffees.push(createCoffeeDto);
    }

    update(id: string, updateCoffeeDto:any ){
        const existingCoffee = this.findOne(id);
        if(existingCoffee){

        }
    }
    remove(id: string){
        const coffieeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffieeIndex >= 0){
            this.coffees.splice(coffieeIndex, 1);
        }

    }
}
