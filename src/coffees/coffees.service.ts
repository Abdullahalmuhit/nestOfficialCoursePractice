import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ){

    }

    findAll() {
        return this.coffeeRepository.find({
            relations: ['flavors']
        });
    }
    
    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne({ where: { id },
            relations: ['flavors']
         });
        if (!coffee) {
            throw new HttpException(`Coffeew #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }
    
    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlovorByName(name))
        );
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto ){
        const flavors = updateCoffeeDto.flavors && (
            await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlovorByName(name)))
        )


        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
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
            message: `Coffee with ID ${id} has been successfully delet  ed.`
        };
        } else {
            throw new NotFoundException(`Coffee with ID ${id} not found.`);
        }
       

    }

    private async preloadFlovorByName(name: string): Promise<Flavor>{
        const existingFlavor = await this.flavorRepository.findOne( { where: { name }});

        if(existingFlavor){
            return existingFlavor;
        }

        return this.flavorRepository.create({name});

    } 
}
