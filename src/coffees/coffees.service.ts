import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ){

    }

    findAll() {
        return this.coffeeRepository.find();
    }
    
    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne({ where: { id } });
        if (!coffee) {
            throw new HttpException(`Coffeew #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }
    
    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto ){
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        })
        if (coffee) {
            return this.coffeeRepository.save(coffee);
        } else {
            throw new NotFoundException(`Coffee with ID ${id} not found.`);
        }
    }
    async remove(id: number){
        const coffee = await this.findOne(id);
        if (coffee) {
            await this.coffeeRepository.remove(coffee);
        return {
            status: HttpStatus.OK,
            message: `Coffee with ID ${id} has been successfully deleted.`
        };
        } else {
            throw new NotFoundException(`Coffee with ID ${id} not found.`);
        }
       

    }
}
