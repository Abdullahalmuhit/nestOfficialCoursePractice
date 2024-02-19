import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[]= [
        {
            id: 1,
            name: 'Shipwreck Roast1',
            brand: 'Buddy Brew1',
            flavors: ['chocolate1', 'vanilla1']
        },
        {
            id: 2,
            name: 'Shipwreck Roast2',
            brand: 'Buddy Brew2',
            flavors: ['chocolate2', 'vanilla2']
        },
        {
            id: 3,
            name: 'Shipwreck Roast3',
            brand: 'Buddy Brew3',
            flavors: ['chocolate3', 'vanilla3']
        }
    ]; 

    findAll() {
        return this.coffees;
    }
    
    findOne(id:string){
        const coffee =  this.coffees.find(item => item.id === +id);
        if(!coffee){
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;

    }
    create(createCoffeeDto:any ){
         this.coffees.push(createCoffeeDto);
         return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto:any ){
    const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            Object.assign(existingCoffee, updateCoffeeDto);
            return existingCoffee; 
        } else {
            throw new Error(`Coffee with ID ${id} not found.`);
        }
    }
    remove(id: string){
        const coffieeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffieeIndex >= 0){
            this.coffees.splice(coffieeIndex, 1);
        }

    }
}
